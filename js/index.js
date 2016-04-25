$('document').ready(function() {
  var sequenceCont = 1;
  var sounds = [
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  ];

  var computerSequence = [];
  var userSequence = [];
  var turn = "computer";
  var userCont = 0;
  var computerCont = 0;
  var btn = document.getElementsByClassName("btn-color");
  var strictMode = false;
  var myInterval;
  var sound = new Audio();
  var valuesInterval = [1000, 400];

  //======================================

  function restart() {
    turn = "computer";
    userCont = 0;
    userSequence = [];
    computerSequence = [];
    computerCont = 0;
    sequenceCont = 1;
    valuesInterval = [1000, 400];
    computerTurn();
    $("#status").html("- -");
  }

  //======================================

  function showSequence() {
    clearInterval(myInterval);
    $(".btn-color").each(function() {
      console.log("fez");
      $(this).removeClass("user");
    });

    myInterval = setInterval(function() {
      turn = "computer";
      if (computerCont < sequenceCont) {
        btn[computerSequence[computerCont]].style.opacity = "1";
        sound.src = sounds[computerSequence[computerCont]];
        sound.play();
        setTimeout(function() {
          btn[computerSequence[computerCont]].style.opacity = ".5";
          computerCont++;
        }, valuesInterval[1]);

      } else {
        clearInterval(myInterval);
        computerCont = 0;
        turn = "user";
        $(".btn-color").each(function() {
          $(this).addClass("user");
        });
      }

    }, valuesInterval[0]);
  }

  //======================================

  function computerTurn() {
    computerSequence.push(Math.floor(Math.random() * 4));
    turn = "user";
    showSequence();
  }

  //======================================

  function userTurn() {
    if (turn == "user" && userCont < sequenceCont) {
      sound.src = sounds[$(".btn-color").index(this)];
      sound.play();

      if ($(".btn-color").index(this) == computerSequence[userCont]) {
        userSequence.push($(".btn-color").index(this));
        userCont++;

        if (userCont == 20) {
          $("#status").html("You Won!!!");
          setTimeout(restart, 1500);
          return;
        }

        switch (sequenceCont) {
          case 5:
            valuesInterval = [800, 400];
            break;
          case 9:
            valuesInterval = [650, 300];
            break;
          case 13:
            valuesInterval = [500, 300];
            break;
        }

        if (userCont >= sequenceCont) {
          userCont = 0;
          userSequence = [];
          turn = "computer";
          $("#status").html(sequenceCont);
          if (sequenceCont < 10) {
            $("#status").prepend("0");
          }
          sequenceCont++;
          computerTurn();
        }
      } else {
        turn = "computer";
        userCont = 0;
        userSequence = [];
        $("#status").html("Wrong");

        if (strictMode) {
          computerSequence = [];
          computerCont = 0;
          sequenceCont = 1;
          computerTurn();
          setTimeout(function() {
            $("#status").html("- -");
          }, 800);
        } else {
          setTimeout(function() {
            $("#status").html(sequenceCont - 1);
            if (sequenceCont < 10) {
              $("#status").prepend("0");
            }
          }, 800);
        }
        showSequence();

      }

    }

  }

  //======================================

  $("#btn-start").click(computerTurn);

  $(".btn-color").each(function() {
    $(this).click(userTurn);
  });

  $("#btn-strict").click(function() {
    strictMode = strictMode == true ? false : true;
  });

  $("#btn-restart").click(function() {
    restart();
  });

  $("#btn-info").click(function() {
    $("#info").fadeIn();
    $("#mask-info").fadeIn();
  });

  $("#btn-close, #mask-info").click(function() {
    $("#info").fadeOut();
    $("#mask-info").fadeOut();
  });

});