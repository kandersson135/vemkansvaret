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

			/*
        $('#file-input').change(function(event) {
            let file = event.target.files[0];
            if (!file) return;

            let reader = new FileReader();
            reader.onload = function(e) {
                let lines = e.target.result.split('\n');
                let newQuestions = [];
                for (let i = 0; i < lines.length; i += 2) {
                    if (lines[i] && lines[i + 1]) {
                        newQuestions.push({ question: lines[i].trim(), answer: lines[i + 1].trim() });
                    }
                }
                questions = newQuestions;
                usedQuestions = [];
                alert("Frågor laddade!");
            };
            reader.readAsText(file);
        });
        */

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

/*
let questions = [
  { question: "Vilken är Sveriges huvudstad?", answer: "Stockholm" },
  { question: "Vad är 5 + 5?", answer: "10" },
  { question: "Vad heter Pippi Långstrumps apa?", answer: "Herr Nilsson" },
  { question: "Vilken bokstav kommer efter 'B' i alfabetet?", answer: "C" },
  { question: "Vad heter Pippi Långstrumps häst?", answer: "Lilla Gubben" },
  { question: "Vad rimmar på 'sol'?", answer: "Mol, stol, kol, etc." },
  { question: "Vem har skrivit böckerna om Emil i Lönneberga?", answer: "Astrid Lindgren" },
  { question: "Vad heter kaninen i filmen 'Bambi'?", answer: "Stampe" },
  { question: "Vad är 7 + 5?", answer: "12" },
  { question: "Vad är hälften av 10?", answer: "5" },
  { question: "Hur många ben har tre katter tillsammans?", answer: "12" },
  { question: "Om du har 20 kronor och köper en glass för 15 kronor, hur mycket har du kvar?", answer: "5 kronor" },
  { question: "Vad är dubbelt så mycket som 4?", answer: "8" },
  { question: "Vilken planet bor vi på?", answer: "Jorden" },
  { question: "Vilket djur är störst i världen?", answer: "Blåvalen" },
  { question: "Vad blir is om den smälter?", answer: "Vatten" },
  { question: "Vilken färg har solen?", answer: "Gul" },
  { question: "Vad kallas en bebishund?", answer: "Valp" },
  { question: "Vad använder man för att borsta tänderna?", answer: "Tandborste" },
  { question: "Vad heter det man äter på morgonen?", answer: "Frukost" },
  { question: "Vad ska man göra innan man äter för att hålla sig ren?", answer: "Tvätta händerna" },
  { question: "Vad ska man ha på sig när det regnar?", answer: "Regnjacka" },
  { question: "Vad gör du när du säger 'hej då' med handen?", answer: "Vinkar" },
  { question: "Vilken färg får du om du blandar blått och gult?", answer: "Grönt" },
  { question: "Vad kallas en form med fyra lika långa sidor?", answer: "Kvadrat" },
  { question: "Vilken färg har en tomat?", answer: "Röd" },
  { question: "Vad kallas en form som ser ut som ett ägg?", answer: "Oval" },
  { question: "Vilken färg har himlen en solig dag?", answer: "Blå" },
  { question: "Vad heter kungen i Sverige?", answer: "Kung Carl XVI Gustaf" },
  { question: "Vilket land kommer jultomten ifrån enligt traditionen?", answer: "Finland" },
  { question: "Vad färger har den svenska flaggan?", answer: "Blå och gul" },
  { question: "Vad heter den svenska nationalsången?", answer: "Du gamla, du fria" },
  { question: "Vad firar vi den 6 juni i Sverige?", answer: "Sveriges nationaldag" },
  { question: "Vilka av dessa är inte ett djur: lemur, katamaran, ullgris?", answer: "Katamaran (det är en båt)" },

  { question: "Vad heter kaninen i Greta Gris?", answer: "Karin Kanin" },
  { question: "Vilket är det största djuret som lever på land?", answer: "Elefanten (afrikansk savannelefant)" },
  { question: "Vad heter huset där den amerikanska presidenten bor?", answer: "Vita huset" },
  { question: "Hur många spelare är det som mest i ett fotbollslag under en fotbollsmatch? (förutom avbytare)", answer: "11, inklusive målvakt" },
  { question: "Vilket djur är Alex i filmen Madagaskar?", answer: "Lejon" },
  { question: "Vilket djur har högst (kraftigast) läte?", answer: "Valen (188 decibel, högre än ett jetplan)" },
  { question: "Vem är Tom i 'Tom och Jerry', är det musen eller katten?", answer: "Katten" },
  { question: "Har ett piano flest svarta eller vita tangenter?", answer: "Vita (52 vita, 36 svarta på ett vanligt piano)" },
  { question: "Vilket instrument spelar Snusmumriken på?", answer: "Munspel" },
  { question: "Vilket land är mest känt för att ha mumier?", answer: "Egypten" },
  { question: "Hur många brickor har varje spelare i Ludo?", answer: "Fyra" },
  { question: "Vilket av de här djuren är minst: pytonorm, katt, tiger eller mus?", answer: "Mus" },
  { question: "I vilken populär film kan vi höra sången 'Slå dig fri'?", answer: "Frost" },
  { question: "Sant eller osant: Ingen handbollsspelare får lov att röra bollen med foten.", answer: "Osant! Målvakten får röra bollen med foten innanför målområdet." },
  { question: "Vilken färg har giraffens tunga?", answer: "Lila, blå eller nästan svart" },
  { question: "I vilket land hittar vi världens största mur?", answer: "Kina" },
  { question: "Vad heter Harry Potters uggla?", answer: "Hedvig" },
  { question: "Hur många färger finns det i regnbågen?", answer: "Sju (röd, orange, gul, grön, blå, indigo och violett)" },
  { question: "Vad är russin gjorda av?", answer: "Vindruvor" },
  { question: "Vilken idrott är Mohamed Salah känd från?", answer: "Fotboll" },
  { question: "I vilken stad hittar vi klocktornet Big Ben?", answer: "London" },
  { question: "I vilket dataspel bygger man med klosser och kämpar mot monster?", answer: "Minecraft" },
  { question: "Hur många valpar är det i Paw Patrol?", answer: "Sex" },
  { question: "Vad kallas fårets barn?", answer: "Lamm" },
  { question: "Vad händer med Pinocchios näsa när han ljuger?", answer: "Den växer" },
  { question: "Hur många dagar är det på ett år?", answer: "365" },
  { question: "Vad består moln av: bomull, rök eller vatten?", answer: "Vatten" },
  { question: "Vilket berömt skepp sjönk på sin allra första tur 1912?", answer: "Titanic" },
  { question: "Hur många ben har en spindel?", answer: "Åtta" },
  { question: "Vilken färg får du om du blandar blått och rött?", answer: "Lila" },
  { question: "Vem bor i en ananas på havets botten?", answer: "Svampbob Fyrkant" },
  { question: "Vad är en brontosaurus?", answer: "En dinosaurie" },
  { question: "Hur många ringar är det i den olympiska flaggan?", answer: "Fem (blå, gul, svart, grön och röd)" }
];


let usedQuestions = [];

function getRandomQuestion() {
  if (questions.length === 0) return null;
  let index = Math.floor(Math.random() * questions.length);
  return questions.splice(index, 1)[0];
}

let currentQuestion = null;

$('#new-question').click(function() {
  if (questions.length === 0) {
    $('.question-box').text("Inga fler frågor!");
    return;
  }
  currentQuestion = getRandomQuestion();
  usedQuestions.push(currentQuestion);
  $('.question-box').fadeOut(200, function() {
    $(this).text(currentQuestion.question).fadeIn(200);  // Smidig övergång för att visa ny fråga
  });
  $('.answer').fadeOut(200);  // Döljer svaret om det var synligt
  $('.answer').text(currentQuestion.answer);  // Uppdaterar svaret
});

$('.question-box').click(function() {
  if (currentQuestion) {
    $('.answer').fadeToggle(500);  // Fadear in eller ut svaret
  }
});

$('#add-team').click(function() {
  let teamName = $('#team-name').val().trim();
  if (teamName) {
    let teamId = 'team-' + teamName.replace(/\s+/g, '-').toLowerCase();
    if ($(`#${teamId}`).length === 0) {
      $('#teams').append(`<div class="team" id="${teamId}">
        ${teamName}: <span class="score">0</span> poäng
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
  scoreElement.text(currentScore + 15);
});

$(document).on('click', '.remove-points', function() {
  let teamId = $(this).data('team');
  let scoreElement = $(`#${teamId} .score`);
  let currentScore = parseInt(scoreElement.text());
  scoreElement.text(Math.max(0, currentScore - 15));
});

// Lägg till event listener för att visa bekräftelse när man trycker på lagnamnet
$(document).on('click', '.team', function(event) {
  // Förhindra att eventet triggas när man klickar på poängknapparna
  if ($(event.target).hasClass('add-points') || $(event.target).hasClass('remove-points')) {
    return;
  }

  let teamId = $(this).attr('id'); // Hämta team-ID
  if (confirm("Vill du ta bort detta lag?")) {
    $(`#${teamId}`).remove(); // Ta bort laget från DOM om bekräftat
  }
});
*/
