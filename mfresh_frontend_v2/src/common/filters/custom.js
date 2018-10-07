let date = value=>{
  let d=new Date(value);
  let year=d.getFullYear();
  let month=d.getMonth()+1;
  month=month<10?'0'+month:month;
  let date=d.getDate();
  date=date<10?'0'+date:date;
  return year+'-'+month+'-'+date
}
export {date}
