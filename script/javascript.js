const queryEl = document.getElementById("query");
const meaning = document.getElementById("meaning");
const sound = document.getElementById("sound");
const reset = document.getElementById("reset")
let index = 0
let meanings = []
let audio = "";

async function meaningQuery(){

  meaning.innerHTML = "updating..."

  let word = queryEl.value;
  const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  try {
      let response = await fetch(url + word).then((res) => res.json());
      meanings = response[0]["meanings"]
      if (meanings.length == 1) {
        meaning.innerHTML = `Definition: ` + meanings[index]["definitions"][0]["definition"];
        next.setAttribute("hidden", "hidden");
      } else {
        meaning.innerHTML = `Definition ${index + 1}: ` + meanings[index]["definitions"][0]["definition"];
      }

      audio = response[0]["phonetics"][0]["audio"];
  } catch(error) {
    meaning.innerHTML = "Definition not found!"
  }

  if(audio) {
    sound.setAttribute("src", audio);
    sound.removeAttribute("hidden");
    sound.load();
  }

  if(meanings.length > 1) {
    next.removeAttribute("hidden");
  }

  reset.removeAttribute("hidden");
};

queryEl.addEventListener("keydown", function(e) {
  if(e.key == "Enter") {
    meaningQuery()
  }
});

reset.addEventListener("click", () => {
  meaning.innerHTML = "Type a word and press Enter";
  sound.setAttribute("hidden", "hidden");
  reset.setAttribute("hidden", "hidden");
  next.setAttribute("hidden", "hidden");
  queryEl.value = "";
  index = 0;
  audio = "";
  meanings = [];
})

next.addEventListener("click", () => {
  index += 1;
  if (index == meanings.length) {
    index -= meanings.length
  };
  meaning.innerHTML = `Definition ${index + 1}: ` + meanings[index]["definitions"][0]["definition"];
})
