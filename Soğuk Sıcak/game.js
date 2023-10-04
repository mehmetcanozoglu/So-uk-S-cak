const form = document.querySelector("form");
const guess = form.querySelector("#guess-input");
const resultText = document.querySelector(".result-text");
const prevGuessDiv = document.querySelector(".prev-guesses");
const guessAttempt = document.querySelector(".guess-attempt");
const infoBtn = document.querySelector(".info-btn");
const restartBtn = document.querySelector(".reset-btn");
let attempt = 1;
let prevGuesses = [];

let randomNumber = Math.floor(Math.random() * 100) + 1;

restartBtn.style.display = "none";


infoBtn.addEventListener("click", () => {
  Swal.fire({
    padding: "2rem",
    title: "<b>Nasıl Oynanır ?</b>",
    icon: "info",
    html: `<ul>
        <li>Oyun başladıgında 0-100 arasında bir sayı oluşturulacak</li>
        <li>Ve bu sayıyı tahmin etmeye çalış !!!</li>
        <li>Ayrıca sana ne kadar yaklaştıgını söyleyen ufak ipuçları çıkacak !</li>
        <li>Hadi ne duruyosun başlasana !!</li>
        </ul>`,
    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: true,
    confirmButtonText: "Anlaşıldı!",
    buttonsStyling: false,
    customClass: {
      popup: "popup-class",
      title: "title-class",
      content: "content-class",
    },
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (guess.value === "") {
    resultText.style.color = "red"
    resultText.textContent = "Önce bir sayı giriniz"
    setTimeout(() => {
      resultText.textContent = "";
    }, 2000)

  } else {
    let diff = Math.abs(guess.value - randomNumber)
    prevGuesses.push(guess)
    getAttemp()
    getResult(diff)
    showPrevGuesses();
    // console.log(randomNumber, prevGuesses);
  }
})

function getResult(diff) {
  let msg;
  if (diff === 0) {
    msg = `Helal be olm ${attempt - 1}. tahminde bildin. Tekrar oynamak için aşağıdan tıkla`;
    restartBtn.style.display = "";
  } else if (diff < 5) {
    msg = "Çok sıcaaaaak! Yakınsın valla bayağı ha gayret";
  } else if (diff < 15) {
    msg = "Eh yani ılık bu Az bi gayretle yaklaşabilirsin";
  } else if (diff < 25) {
    msg = "Üşüyoruz usta";
  } else if (diff < 35) {
    msg = "Aga donacam yakında az daha dene";
  } else if (diff < 45) {
    msg = "Buuuuuuuuuz gibi";
  } else {
    msg = "Ohooo uzaklaş burdan çok yanlış yerdesin";
  }
  resultText.textContent = msg;
}



function getAttemp() {
attempt++;
guessAttempt.textContent = `${attempt}. tahmin`
}

function showPrevGuesses() {
  const index = prevGuesses.length - 1;
  const guesses = document.createElement("li");
  guesses.textContent = prevGuesses[index].value;
  prevGuessDiv.appendChild(guesses);
}


