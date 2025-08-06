let questions = [];
let usedQuestions = [];
let currentQuestion = null;

let lobbyAudio = new Audio('audio/lobby.mp3');
lobbyAudio.volume = 0.3;
lobbyAudio.loop = true;
lobbyAudio.play();

$('#muteBtn').click(function() {
  if (lobbyAudio.muted) {
    lobbyAudio.muted = false;
    $(this).text('🔊');  // Ljud på
  } else {
    lobbyAudio.muted = true;
    $(this).text('🔇');  // Ljud av
  }
});

// Varna användaren innan flikstängning
let gameIsActive = false;
$(window).on('beforeunload', function(e) {
  if (gameIsActive) {
    e.preventDefault();
    e.returnValue = '';
  }
  // Om gameIsActive är false händer inget, ingen varning visas
});

function getRandomQuestion() {
  if (questions.length === 0) return null;
  let index = Math.floor(Math.random() * questions.length);
  return questions.splice(index, 1)[0];
}

$('#new-question').click(function() {
  if (questions.length === 0) {
    $('.question-box').text("Inga fler frågor!");
    return;
  }
  currentQuestion = getRandomQuestion();
  usedQuestions.push(currentQuestion);
  $('.question-box').fadeOut(200, function() {
    $(this).text(currentQuestion.question).fadeIn(200);
  });
  $('.answer').fadeOut(200);
  $('.answer').text(currentQuestion.answer);
});

$('.question-box').click(function() {
  if (currentQuestion) {
    $('.answer').fadeToggle(300);
  }
});

$('#add-team').click(function() {
  gameIsActive = true;

  let teamName = $('#team-name').val().trim();
  if (teamName) {
    let teamId = 'team-' + teamName.replace(/\s+/g, '-').toLowerCase();
    if ($(`#${teamId}`).length === 0) {
      $('#teams').append(`<div class="team" id="${teamId}"><span class="team-name">${teamName}</span>: <span class="score">0</span>
      <br>
        <button class="add-points" data-team="${teamId}">+</button>
        <button class="remove-points" data-team="${teamId}">-</button>
      </div>`);
    }
    $('#team-name').val("");
  }
});

$(document).on('click', '.add-points', function() {
  let teamId = $(this).data('team');
  let scoreElement = $(`#${teamId} .score`);
  let currentScore = parseInt(scoreElement.text());
  scoreElement.text(currentScore + 10);
});

$(document).on('click', '.remove-points', function() {
  let teamId = $(this).data('team');
  let scoreElement = $(`#${teamId} .score`);
  let currentScore = parseInt(scoreElement.text());
  scoreElement.text(Math.max(0, currentScore - 10));
});

$(document).on('click', '.team', function(event) {
  // Om klicket är på plus- eller minusknapparna, gör inget
  if ($(event.target).hasClass('add-points') || $(event.target).hasClass('remove-points')) {
    return;
  }

  let teamId = $(this).attr('id');

  // SweetAlert för att bekräfta borttagning
  swal({
    title: "Är du säker?",
    text: "Vill du ta bort detta lag?",
    buttons: ["Avbryt", "Ja, ta bort"],
  }).then((willDelete) => {
    if (willDelete) {
      $(`#${teamId}`).remove();
    }
  });
});

$('#load-questions').click(function() {
  // Triggera klick på filväljaren när knappen trycks
  $('#file-input').click();
});

// När en fil väljs från filväljaren
$('#file-input').change(function() {
  let file = this.files[0];
  if (!file) {
    alert("Välj en fil först!");
    return;
  }

  let reader = new FileReader();
  reader.onload = function(event) {
    let lines = event.target.result.split('\n').map(line => line.trim()).filter(line => line);
    questions = [];
    for (let i = 0; i < lines.length; i += 2) {
      if (i + 1 < lines.length) {
        questions.push({ question: lines[i], answer: lines[i + 1] });
      }
    }
    //alert("Frågor inlästa: " + questions.length);
    swal("Frågor inlästa", "Antal frågor: " + questions.length);
    gameIsActive = true;
  };
  reader.readAsText(file);
});

// prevent spam function
var emailAddress = "hej@kimandesson.se";
var encodedEmail = emailAddress.split('').map(function(char) {
  return '&#' + char.charCodeAt(0) + ';';
}).join('');
$("#email").html('<a href="mailto:' + emailAddress + '">Kontakt</a>');

// Help btn click
$('#helpButton').on('click', function() {
  var helphtml = document.createElement("div");
  helphtml.style.textAlign = "left";
  helphtml.innerHTML = `
    <p>Lägg till tävlande genom att trycka på <strong>"Lägg till"</strong>-knappen.
    Tryck på ett lagnamn för att ta bort det från listan. Klicka på plus- eller minusknappen för att öka eller minska poängen.</p>

    <p>Ladda upp egna frågor och svar från ett textdokument. Dokumentet ska vara
    formaterat så att varje fråga och svar skrivs på en egen rad utan extra mellanrum:</p>

    <pre>Fråga<br>Svar<br>Fråga<br>Svar<br>...</pre>

    <p>Frågorna presenteras i slumpad ordning.</p>
  `;

  swal({
    title: "Hjälp",
    content: helphtml
  });
});

// About btn click
$('#aboutButton').on('click', function() {
  var abouthtml = document.createElement("div");
  abouthtml.style.textAlign = "left"; // Vänsterjusterar texten
  abouthtml.innerHTML = `
    <p>Webbplatsen är fortfarande under utveckling, men går att testa.
    Hör av dig om du har några funderingar.</p>

    <p>Webbplatsen är skapad av
    <a href="https://kimandesson.se" target="_blank" style="color:#fff;">Kim Andersson</a>.</p>
  `;

  swal({
    title: "Om webbplatsen",
    content: abouthtml
  });
});
