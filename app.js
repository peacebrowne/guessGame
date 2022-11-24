const main = document.querySelector('main')
const article = document.querySelector('article')

let numbers =[...Array(101).keys()]

console.log(numbers)
const audio_box = [
    "./audio/apostle.m4a",
    "./audio/basic1plus1.m4a",
    "./audio/chants-2.m4a",
    "./audio/chants.m4a",
    "./audio/cutting-grass.m4a",
    "./audio/dinner-man.m4a",
    "./audio/funke.m4a",
    "./audio/jesus-is-lord.m4a",
    "./audio/jezuz.m4a",
    "./audio/macdonalds.m4a",
    "./audio/no-future.m4a",
    "./audio/persecuted.m4a",
    "./audio/pregnancy.m4a",
    "./audio/think-about-your-life.m4a",
    "./audio/you-are-a-failure.m4a",
    "./audio/you-can-never-make-it-1.m4a",
    "./audio/you-can-never-make-it-full.mp3",

]

const audioContext = new AudioContext();
let audio;

const selected_audio = () =>{
    let rn = Math.floor(Math.random() * audio_box.length)

    audio = new Audio(audio_box[rn])
    let source = audioContext.createMediaElementSource(audio)
    source.connect(audioContext.destination)

    if (audioContext.state === 'suspended') {
        audioContext.resume()
    }

    audio.play()

}

const hideEle = ele => ele.style.display = 'none';
const showEle = ele => ele.style.display = 'flex';

let backup = [];

const generate_random_number = n =>{
    return Math.floor(Math.random() * n)
}

// console.log([...Array(101).keys()])

let random_number;

const render_numbers = () =>{

    random_number = generate_random_number(100)
    const section = document.createElement('section')

    for(let i = 0; i < 100; i++){
        
        let rn = Math.floor(Math.random() * numbers.length);
        const button = `<button class="number" data-value="${numbers[rn]}">${numbers[rn]}</button>`
        section.innerHTML += button
        backup.push(numbers[rn])
        numbers.splice(rn,1)

    }

    main.appendChild(section)

}
render_numbers()

const start = document.querySelector('.start')
start.addEventListener('click', ev => {
    
    let action = ev.target;
    if(action.dataset.start === 'false'){
        
        action.dataset.start = true
        hideEle(article)
        showEle(main)
        chances(7)

    }
    else{
        restart()
    }
})

const restart = () =>{

    // numbers = backup;
    // backup = [];
    render_numbers()
    main.innerHTML = ''
    main.addEventListener('click',check)
    render_numbers()
    lives.innerHTML = 7;

}

const check = ev =>{

    let btn = ev.target;
    if(btn.className.includes('number')){

        let value = btn.dataset.value;
        if(value == random_number) correct(btn)
        else wrong(btn)

    }

}

const correct = btn => {

    btn.classList.toggle('correct')
    main.removeEventListener('click',check)
   
}

const wrong = btn => {

    if(btn.className.includes('wrong'))return;
    btn.classList.toggle('wrong')
    selected_audio()
    chances()

}

main.addEventListener('click',check)

const lives = document.querySelector('.lives')

const chances = n =>{
    
    let value = +lives.innerHTML
    isNaN(value) ? lives.innerHTML = n : lives.innerHTML = --value;
    if(value <= 0) {

        main.removeEventListener('click',check)
        lucky_number(random_number)
        
    }

}

const lucky_number = n =>{
    
   setTimeout(()=>{
        const section = document.querySelector('section')
        let element = Array.from(section.children).find(val => val.dataset.value == n)
        element.classList.toggle('correct')
   },1000)

}