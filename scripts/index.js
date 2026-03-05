// creating element to show dynamic synonyms
const createElement=(arr)=>{
    const newElement = arr.map((el) => `<span class="btn">${el}</span>`);
    return newElement.join(' ');
}

const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then((json) => displayLessons(json.data))
}

const removeActiveClass=()=>{
    const lessonBtns = document.querySelectorAll('.lesson-btn');
    lessonBtns.forEach((btn)=> btn.classList.remove('active'));
}

const loadLevelWork=(id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res)=> res.json())
        .then((json)=> {
            removeActiveClass();
            const clickedBtn = document.getElementById(`lesson-btn-${id}`);
            clickedBtn.classList.add('active');
            displayWord(json.data)
        })
}
// {
//     "id": 80,
//     "level": 1,
//     "word": "Run",
//     "meaning": "দৌড়ানো",
//     "pronunciation": "রান"
// }
const loadWordDetails=async(id)=>{
 const url = `https://openapi.programming-hero.com/api/word/${id}`
 const res = await fetch(url);
 const json = await res.json();
 displayWordDetails(json.data);
}
const displayWordDetails=(word)=>{
    // console.log(word);
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
        <div>
            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : <span class="font-bangla">${word.pronunciation}</span>)</h2>
        </div>
        <div>
            <h2 class="text-2xl font-bold">Meaning</h2>
            <p class="font-bangla text-xl font-medium">${word.meaning}</p>
        </div>
        <div>
            <h2 class="text-2xl font-bold">Example</h2>
            <p class="text-[20px]">${word.sentence}</p>
        </div>
        <div>
            <h2 class="text-2xl font-bold font-bangla">সমার্থক শব্দ গুলো</h2>
        </div>
        <div class="flex gap-4">
            <div>${createElement(word.synonyms)}</div>
        </div>
    `;
    document.getElementById('my_modal_word').showModal(); // very important to understant
}

const displayWord=(words)=>{
    const wordContainer = document.getElementById('words-container');
    wordContainer.innerHTML = '';
    if(words.length == 0){
        wordContainer.innerHTML = `
        <div class="font-bangla col-span-full text-center space-y-4">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <p class="text-2xl font-bold">নেক্সট Lesson এ যান</p>
        </div>
        `
    }
    words.forEach((word)=>{
        console.log(word);
        const wordCard = document.createElement('div');
        wordCard.innerHTML = `
        <div class="bg-white px-8 py-10 rounded-xl text-center space-y-3">
            <h2 class="text-2xl font-bold">${word.word ? word.word : 'word পাওয়া যায় নি'}</h2>
            <p>Meaning / Pronounciation</p>
            <p class="font-bangla text-xl font-medium">"${word.meaning ? word.meaning : 'Meaning পাওয়া যায় নি'} / ${word.pronunciation ? word.pronunciation : 'pronunciation পাওয়া যায় নি'}"</p>
            <div class="flex justify-between">
                <button onclick="(loadWordDetails(${word.id}))" class="btn btn-accent p-2 rounded-md"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn btn-accent p-2 rounded-md"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(wordCard);
    })
}

const displayLessons=(lessons)=>{
    // get the container
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.innerHTML = '';
    // apply loop on lessons
    lessons.forEach((lesson)=>{
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
            <button onclick="loadLevelWork(${lesson.level_no})" id="lesson-btn-${lesson.level_no}" class="lesson-btn btn btn-soft btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `;
        lessonContainer.append(btnDiv);
    })
}

loadLessons();