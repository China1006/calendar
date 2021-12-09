let curentTime = new Date()

g('#prevMonth').onclick = () =>{
    const firstDayMonth = new Date(curentTime.getFullYear(),curentTime.getMonth(),1)
    render(new Date(firstDayMonth - 86400 * 1000))
}
g('#nextMonth').onclick = () =>{
    const nextFirstDayMonth = new Date(curentTime.getFullYear(),curentTime.getMonth()+1,1)
    render(nextFirstDayMonth)
}
g('#today').onclick = () =>{
    render(new Date())
}
render(curentTime)
function render(time){
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    initTime()
    generateDays()
    curentTime = time
    function initTime() {
        const time = g('#time')
        time.textContent = `${year}年${month}月`
    }

//帮助函数
    function generateDays(){
        const firstDayOfCurrentMonth = new Date(year, month - 1, 1)
// console.log(firstDayOfCurrentMonth.toISOString());
        const weekdayOfFirstDayOfCurrentMonth = firstDayOfCurrentMonth.getDay()
//月末
        const monthEnd = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000)
//这个月有几天
        const monthHaveDay = monthEnd.getDate()
        const monthEndWeekday = monthEnd.getDay()


        const days = g('#days')
        let n = 0
        days.innerHTML = ''
//铺垫
        for (let i = 1; i < weekdayOfFirstDayOfCurrentMonth; i++) {
            const li = document.createElement('li')
            const d = new Date(firstDayOfCurrentMonth - 86400 * 1000 * i)
            li.textContent = d.getDate()
            li.classList.add('calendar-days-disabled')
            days.prepend(li)
            n+=1
        }
        const now = new Date()
        let selectedLi
        for (let i = 1; i <= monthHaveDay; i++) {
            const li = document.createElement('li')
            li.textContent = i
            if(i === now.getDate() && month === now.getMonth()+1 && year === now.getFullYear()){
                li.classList.add("calendar-days-today")
            }
            li.onclick = ()=>{
                if(selectedLi){selectedLi.classList.remove('calendar-days-select')}
                li.classList.add("calendar-days-select")
                selectedLi = li
            }
            days.append(li)
            n+=1
        }
//铺垫
        let i = monthEndWeekday + 1
        console.log(n);
        for (let j = 0; j < 42 - n; j++) {
            const delta = i - monthEndWeekday
            const li = document.createElement('li')
            const d = new Date(monthEnd - 0 + 86400 * 1000 * delta)
            li.textContent = d.getDate()
            li.classList.add('calendar-days-disabled')
            days.append(li)
            i++
        }
    }
}




function g(selector) {
    return document.querySelector(selector)
}

function gs(selector) {
    return document.querySelectorAll(selector)
}