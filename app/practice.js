let table = document.querySelector("table");
let thead = document.createElement("thead");
let th = document.createElement("th");
let tr = document.createElement("tr");
let tr_tbody = document.createElement("tr");
let td = document.createElement("td")
let tbody = document.createElement("tbody")
let modal_title = document.querySelector("#exampleModalLabel");
let modal_button = document.querySelector("#modal_button");
let previous_button = document.querySelector("#previous");
let next_button = document.querySelector("#next");
let day_modal_header = document.querySelector("#day-modal-header");
let year_modal_header = document.querySelector("#year-modal-header");
let days_of_week = ["ش","ی","د","س","چ","پ","ج"];
let today_button = document.querySelector("#today");
for(let i=days_of_week.length -1;i>=0;i--){
    let th = document.createElement("th");
    th.innerText = days_of_week[i]
    tr.appendChild(th);
}

thead.appendChild(tr);
table.appendChild(thead);
// add empty cell 
// let first_day_of_month = find_first_day_of_month_persian();
// console.log(first_day_of_month);
// for(let i=1;i<first_day_of_month;i++){
//     let td = document.createElement("td");
//     tr_tbody.appendChild(td);    
// }

// // table.appendChild(tr_tbody);
// // tr_tbody = document.createElement("tr");
// let the_number_last_day_of_month = last_day_of_month();
// for(let i =1;i<=the_number_last_day_of_month;i++){
//     let td = document.createElement("td");
//     td.innerText = i;
//     td.addEventListener("click",function(){
//         console.log(td.innerText);
//     });
//     tr_tbody.appendChild(td);
//     if((first_day_of_month+i)%7 == 0){
//         tbody.appendChild(tr_tbody);
//         tr_tbody = document.createElement("tr");
//     }

// }
// table.appendChild(tbody);
// if(tr_tbody.innerHTML != null){
//     table.appendChild(tr_tbody);
// }

function resetDate(value){
    let res = persian_number_to_english_number(value.toLocaleDateString("fa")).split("/")
    res = JalaliDate.jalaliToGregorian(res[0],res[1],res[2]);
    res = new Date(res[0],res[1]-1,res[2]);
    return res;    
}
function test(date= new Date()){
    let rDate = resetDate(date);
    let persian_day_week = ["شنبه","یکشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه"];
    let persian_month = ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
    let modal_title = document.querySelector("#exampleModalLabel");
    let date_last_day_before_first_day_of_month = previous_day_georgian(date_first_day_of_month_georgian(date));
    let first_day_of_month_persian = find_number_of_day_week_persian(date_first_day_of_month_georgian(date));
    let number_last_day_of_month = last_day_of_month(date);
    let info = {};
    let today = persian_number_to_english_number(new Date().toLocaleDateString("fa").split("/")[2]);
    let month_modal_title = persian_month[parseInt(persian_number_to_english_number(rDate.toLocaleDateString("fa").split("/")[1]))-1];
    let year_modal_title = persian_number_to_english_number(date.toLocaleDateString("fa")).split("/")[0];
    modal_title.innerText = `${month_modal_title}`;
    year_modal_header.innerText = year_modal_title;
    let day_modal_header_innerText = parseInt(persian_number_to_english_number(rDate.toLocaleDateString("fa")).split("/")[2]);
    day_modal_header.innerText = day_modal_header_innerText;
    // reset function 
    tr_tbody.innerHTML = null;
    tbody.innerHTML = null;
    main(date,tbody,day_modal_header,table)
    return date;
}
console.log(table);
let result_test = new Date();
function setResultTest(result_test){
    if(updateDate(result_test,document.querySelector(".chose")) !=undefined) {
        result_test = updateDate(result_test,document.querySelector(".chose"));
    }
    return result_test
}
previous_button.addEventListener("click",function () {
    let previous_date = go_to_previose_month_persian(setResultTest(result_test));
    result_test = test(previous_date);
});
next_button.addEventListener("click",function () {
    let next_date = go_to_next_month_persian(setResultTest(result_test));
    result_test = test(next_date);
});

today_button.addEventListener("click",function(){
    result_test = new Date();
    result_test = test(result_test);
});
modal_button.addEventListener("click",function(){
    result_test = new Date();
    test(result_test);
    result_test = new Date();
});

