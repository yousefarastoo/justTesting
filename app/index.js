let date = new Date().toLocaleDateString("fa").split("/");  

function find_today(date){
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  let day_date = date.getDate();
  let month_date = date.getMonth();
  let year_date = date.getFullYear();
  return ((day == day_date) && (month == month_date) && (year == year_date));
}
function check_persian_date_exist(year=0,month=0,day=0){
  let date = JalaliDate.jalaliToGregorian(year,month,day);
  let newDate = persian_number_to_english_number(new Date(date[0],date[1],date[2]).toLocaleDateString("fa")).split("/");
  if(newDate[0] == year && newDate[1] == month && newDate[2] == day){
    return true;
  }
  return false;
}
// persian number to english number :
function persian_number_to_english_number(number){
  let res = "";
  let persian_number = {"۰":0,"۱":1,"۲":2,"۳":3,"۴":4,"۵":5,"۶":6,"۷":7,"۸":8,"۹":9};
  let persian_number_array = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"]
  let keys   = Object.keys(persian_number);
  for(let i=0;i<number.length;i++){
    if(persian_number[number[i]] == undefined){
      res+=number[i]
      continue;
    }
    res+= `${persian_number[number[i]]}`;
  }
  if (res =="") return null;
  return res;
}
// determain end day of month
function last_day_of_last_month_of_year(date = new Date()){
  let last_day;
  let array_date = date.toLocaleDateString("fa").split("/");
  let month = parseInt(persian_number_to_english_number(array_date[1]));
  if ( month == 12 ){
    let d = date;
    let diffrent_day = 29 - parseInt(persian_number_to_english_number(array_date[2]));
    last_day = d.setDate(d.getDate() + diffrent_day+1);
    last_day = new Date(last_day).toLocaleDateString("fa").split("/");
    if (month != parseInt(persian_number_to_english_number(last_day))){
      d =  new Date();
      last_day = new Date(d.setDate(d.getDate() + diffrent_day)).toLocaleDateString("fa").split("/")[2];
      last_day = parseInt(persian_number_to_english_number(last_day));
    }
    else{
      last_day = parseInt(persian_number_to_english_number(last_day[2]));
    }
  }
  return last_day;
}
function isLeapYear(date=new Date()){
  let persianYear = persian_number_to_english_number(date.toLocaleDateString("fa")).split("/")[0];
  let tempDate = JalaliDate.jalaliToGregorian(parseInt(persianYear),12,30);
  return parseInt(persian_number_to_english_number(new Date(tempDate[0],tempDate[1]-1,tempDate[2]).toLocaleDateString("fa")).split("/")[1]) == 12;
}

function last_day_of_month(date = new Date()){
    let day;
    let month = parseInt(persian_number_to_english_number(date.toLocaleDateString("fa")).split("/")[1]);
    if(month>=0 && month<7){
      day  =31
    }
    else if(month>6 && month<12){
      day = 30
    }
    else{
      day = isLeapYear(date)?30:29;
    }
    return day;
    // let last_day_of_month;
    // date = date.toLocaleDateString("fa").split("/");
    // let month = parseInt(persian_number_to_english_number(date[1]));
    // if(month<=6){
    //     last_day_of_month = 31;
    // }
    // else if(month>=7 && month<=11){
    //     last_day_of_month = 30
    // }
    // else{
    //     last_day_of_month = last_day_of_last_month_of_year();
    // }


    // return last_day_of_month;
}

function find_number_of_day_week_persian(date){
  let number_of_persian_day_week = [2,3,4,5,6,7,1];  
  return number_of_persian_day_week[date.getDay()];  
}
function dateFirstDayOfMonth(date=new Date()){
  let tempDate = persian_number_to_english_number(date.toLocaleDateString("fa")).split("/");
  let month = parseInt(tempDate[1]);
  let year = parseInt(tempDate[0]);
  let res = JalaliDate.jalaliToGregorian(year,month,1);
  return new Date(res[0],res[1]-1,res[2]);
}
function number_week_month(date=new Date()){
  let number_last_day_of_month = last_day_of_month(date);
  let day_number_week_first_day_of_month = find_number_of_day_week_persian(dateFirstDayOfMonth(date)) 
  let res = 0;
  for(let i=0;i<number_last_day_of_month;i++){
    if(day_number_week_first_day_of_month == 7){
      res++;
      day_number_week_first_day_of_month = 0;
    }
    day_number_week_first_day_of_month++;
  }
  if(day_number_week_first_day_of_month > 0){
    res++;
  }
  return res; 
}
function addChoseClass(date){
  if(!find_today(date))
  document.querySelectorAll("td").forEach(element=>{
     if(element.innerHTML == persian_number_to_english_number(date.toLocaleDateString("fa").split("/")[2])){
      element.classList.add("chose");
     }
  });
}
function main(date = new Date(),tbody = document.createElement("tbody"),day_modal_header,table){
  let blank = 0;
  let persian_date = persian_number_to_english_number(date.toLocaleDateString("fa")).split("/");
  let persian_year = parseInt(persian_date[0]);
  let persian_month = parseInt(persian_date[1]);
  let number_week = number_week_month(date);
  let number_days_of_month = last_day_of_month(date);
  let number_day_week_first_day_of_month = find_number_of_day_week_persian(dateFirstDayOfMonth(date));
  let diffrence = (7 - number_day_week_first_day_of_month)+1;
  let begin_number = 0;
  let days = [];
  let info;
  let newDate;
  let td_date;
  while(number_week > 0){
    let tr = document.createElement("tr");
    for(let i=diffrence;i>begin_number;i--){
      td_date = JalaliDate.jalaliToGregorian(persian_year,persian_month,i);
      td_date = new Date(td_date[0],td_date[1]-1,td_date[2]);
      let td = document.createElement("td");
      if(blank !=0 ){
        for(let j=blank;j>0;j--){
          let td = document.createElement("td");
          td.innerText = null;
          tr.appendChild(td)
        }
        blank = 0;
      }
      if(find_today(td_date)){
        td.classList.add("today");
      }
      addChoseClass(date);
      td.addEventListener("click",function(){
        newDate = JalaliDate.jalaliToGregorian(persian_year,persian_month,parseInt(td.innerHTML));
        newDate = new Date(newDate[0],newDate[1]-1,newDate[2]);
        day_modal_header.innerText = persian_number_to_english_number(newDate.toLocaleDateString("fa").split("/")[2]);
        let chose = document.querySelector(".chose"); 
        if( chose != null){
          chose.classList.remove("chose");
        }
        td.classList.add("chose");
      });
      td.innerText = i;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
    begin_number = diffrence;
    diffrence = diffrence + 7;
    if(diffrence > number_days_of_month){
      blank = diffrence - number_days_of_month;
      diffrence = number_days_of_month;
    }
    number_week--;
  }
  table.appendChild(tbody);
  return newDate;
}
function find_number_of_day_week_persian_as_int(date){
  let number_of_persian_day_week = [2,3,4,5,6,7,1];  
  return number_of_persian_day_week[date];  
}
function find_first_day_of_month_persian(){
  let number_of_pesian_day_week = [0,3,4,5,6,7,1,2]
  let date = new Date().toLocaleDateString("fa").split("/")[2];
  let temp_date = new Date();
  let distance_between_today_and_first_day_of_month;
  let result;
  date = parseInt(persian_number_to_english_number(date));
  distance_between_today_and_first_day_of_month = date-1;
  result = new Date(temp_date.setDate(temp_date.getDate() - distance_between_today_and_first_day_of_month)).getDay();
  return number_of_pesian_day_week[result];
}

function date_first_day_of_month_georgian(date = new Date()){
  let persian_date = persian_number_to_english_number(date.toLocaleDateString("fa")).split("/");
  let gregorian_date = JalaliDate.jalaliToGregorian(parseInt(persian_date[0]),parseInt(persian_date[1]),1);
  let res = new Date(gregorian_date[0],gregorian_date[1]-1,gregorian_date[2]);
  return res;
}

function next_month_from_today_persian(date=new Date().toLocaleDateString("fa")){
  date = persian_number_to_english_number(date).split("/");
  let res;
  let year = parseInt(date[0]);
  let month = parseInt(date[1]);
  let day = parseInt(date[2]);
  res = JalaliDate.jalaliToGregorian(year,month,day);
}
function next_day_georgian(date){
  return new Date(date.setDate(date.getDate()+1));
}

function previous_day_georgian(date){
  return new Date(date.setDate(date.getDate()-1));
}

function date_last_day_of_persian_month_georgian(date = new Date()){
  let oldDate = persian_number_to_english_number(date.toLocaleDateString("fa")).split("/");
  let month  = persian_number_to_english_number(date.toLocaleDateString("fa")).split("/")[1];
  let tempDate = date;
  let res;
  while(true){
    tempDate = next_day_georgian(date);
    let newMonth = persian_number_to_english_number(tempDate.toLocaleDateString("fa")).split("/")[1];
    if(month != newMonth){
      res =  previous_day_georgian(tempDate);
      break;
    }
  }
  return res;
}
function updateDate(date = new Date(),td = document.getElementsByClassName("chose")){
  let value;
  let newDate;
  let persianDate = persian_number_to_english_number(date.toLocaleDateString("fa")).split("/")
  let persianYear = parseInt(persianDate[0]);
  let persianMonth = parseInt(persianDate[1]);
  if(td == null || td.innerHTML == undefined) return undefined;
  value = parseInt(td.innerHTML);
  newDate = JalaliDate.jalaliToGregorian(persianYear,persianMonth,value);
  newDate = new Date(newDate[0],newDate[1]-1,newDate[2]);
  return newDate;
}
function go_to_next_month_persian(date = new Date()){
  let persian_date = persian_number_to_english_number(date.toLocaleDateString("fa")).split("/");
  let year = parseInt(persian_date[0]);
  let month = parseInt(persian_date[1]);
  let day = parseInt(persian_date[2]);
  let last_day_month = last_day_of_month(date);
  month = (month%12) + 1;
  let res;
  if(month == 1){
    year++;
  }
  if((month == 12 || month == 7) && day == last_day_month){  
    let tempDate = JalaliDate.jalaliToGregorian(year,month,1)
    last_day_month = last_day_of_month(new Date(tempDate[0],tempDate[1]-1,tempDate[2]));
    day = last_day_month;
  }
  res = JalaliDate.jalaliToGregorian(year,month,day)
  res = new Date(res[0],res[1]-1,res[2]);
  return res;
}
function go_to_previose_month_persian(date = new Date()){
  let persian_date = persian_number_to_english_number(date.toLocaleDateString("fa")).split("/");
  let year = parseInt(persian_date[0]);
  let month = parseInt(persian_date[1]);
  let day = parseInt(persian_date[2]);
  let last_day_month = last_day_of_month(date);
  let res;
  month = (month%13) - 1;
  if(month == 0){
    month = 12;
    year--;
  }
  if(day == last_day_month && month == 12){
    let tempDate = JalaliDate.jalaliToGregorian(year,month,1)
    last_day_month = last_day_of_month(new Date(tempDate[0],tempDate[1]-1,tempDate[2]));
    day = last_day_month;
  }
  res = JalaliDate.jalaliToGregorian(year,month,day)
  res = new Date(res[0],res[1]-1,res[2]);
  return res;
}