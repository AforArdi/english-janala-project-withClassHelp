const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then((json) => displayLessons(json.data))
}

const loadLevelWork=(id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res)=> res.json())
        .then((json)=> displayWord(json.data))
}
// {
//     "id": 80,
//     "level": 1,
//     "word": "Run",
//     "meaning": "দৌড়ানো",
//     "pronunciation": "রান"
// }
const displayWord=(words)=>{
    const wordContainer = document.getElementById('words-container');
    wordContainer.innerHTML = '';
    words.forEach((word)=>{
        console.log(word);
        const wordCard = document.createElement('div');
        wordCard.innerHTML = `
        <div class="bg-white px-8 py-10 rounded-xl text-center space-y-3">
            <h2 class="text-2xl font-bold">${word.word}</h2>
            <p>Meaning / Pronounciation</p>
            <p class="font-bangla text-xl font-medium">"${word.meaning} / ${word.pronunciation}"</p>
            <div class="flex justify-between">
                <button class="btn btn-accent p-2 rounded-md"><i class="fa-solid fa-circle-info"></i></button>
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
            <button onclick="loadLevelWork(${lesson.level_no})" class="btn btn-soft btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `;
        lessonContainer.append(btnDiv);
    })
}

loadLessons();