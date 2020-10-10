document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#monster-container')
  const url = "http://localhost:3000/monsters/"

  let page = 1

  const renderData = (monster) => {
      const container = document.querySelector('#monster-container')
      const newMonster = document.createElement('div')
      newMonster.setAttribute("data-monster-id", `${monster.id}`)
      newMonster.innerHTML = `
      <h4>Name: ${monster.name}</h4>
      <h5>Age:${monster.age}</h5>
      <p>Description: ${monster.description}</p>
      `
      container.append(newMonster)
  }


  const pageNavigator = () =>{

    const next = document.querySelector('#forward'),
    back = document.querySelector('#back')

    next.addEventListener('click', ()=>{
      page++,
      getData(page)
      console.log(page)
    })
    back.addEventListener('click', ()=>{
      page--
      if (page < 1){
        page = 1
      }
      getData(page)
      console.log(page)
    })
  }


  const getData = (a) => {
    fetch(url + `?_limit=1&_page=${a}`)
      .then(res => res.json())
      .then(monsters => {
        for(const monster of monsters){
          document.querySelector('#monster-container').innerHTML = ''
          renderData(monster)
        }
      })
  }



  const addNewMonster = () => {
    const createMonster = document.querySelector('#create-monster')
    const monsterForm = document.createElement('form')
    monsterForm.setAttribute("id", "monster-form")
    monsterForm.innerHTML = `
    <input id="name" name="name" placeholder="Name..."></input>
    <input id="age" name="age" placeholder="Age..."></input>
    <input id="description" name="description" placeholder="Description..."></input>
    <button type="submit">Create</button>
    `
    createMonster.append(monsterForm)
  }


  const submitHandler = () =>{
    const monsterForm = document.querySelector('#monster-form')
    monsterForm.addEventListener('submit', e =>{
      e.preventDefault()
      const form = e.target
      const name = form.name.value
      const age = form.age.value
      const description = form.description.value

      const newMonsterInfo = { name: name, age: age, description: description}

      options = {
        method: "POST",
        headers:{
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify(newMonsterInfo)
      }

      fetch(url,options)
      .then(res => res.json())
      .then(monster =>{
        const container = document.querySelector('#monster-container')
        renderData(monster, container)
        document.querySelector('#monster-form').reset()
      })
    })
  }


  /* ------------------- section ---------------------*/
  addNewMonster()
  submitHandler()
  pageNavigator()
  getData()
})
