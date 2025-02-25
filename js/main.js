let questions = [];
let usedQuestions = [];
let currentQuestion = null;

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
  if ($(event.target).hasClass('add-points') || $(event.target).hasClass('remove-points')) {
    return;
  }
  let teamId = $(this).attr('id');
  if (confirm("Vill du ta bort detta lag?")) {
    $(`#${teamId}`).remove();
  }
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
    alert("Frågor inlästa: " + questions.length);
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
  swal("Hjälp", "Lägg till tävlande genom att trycka på 'Lägg till'-knappen. Tryck på ett lagnamn för att ta bort det från listan.\n\nLadda upp dina egna frågor och svar från ett textdokument. Dokumentet ska vara formaterat så här:\n\nFråga\nSvar\nFråga\nSvar\n...\n\n Varje fråga och svar ska skrivas på en egen rad utan extra mellanrum.");
});

// About btn click
$('#aboutButton').on('click', function() {
  swal("Om webbappen", "Webbappen är fortfarande under utveckling, men går att testa. Hör av dig om du har några funderingar. \n\n Webbappen är skapad av Kim Andersson (kimandesson.se)");
});
