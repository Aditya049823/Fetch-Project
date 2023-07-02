const endpoint=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;

const container=document.getElementsByClassName("container");

let data=[];
function render(data){
    const table=document.getElementsByClassName("tables")[0];
    table.innerHTML='';
    data.forEach((item) => {
        const row=document.createElement("tr");
        const percentChange=item.price_change_percentage_24h;
        const percentClass=percentChange>=0 ? "positive-change" : "negative-change";

        row.innerHTML=`
            <td class="imagecls"><img src="${item.image}" alt="${item.name}" width="20"></td>
            <td class="name">${item.name}</td>
            <td class="symbol">${item.symbol}</td>
            <td class="high">${"$"+item.high_24h}</td>
            <td class="price">${"$"+item.current_price}</td>
            <td class="percentClass">${item.price_change_percentage_24h}</td>
            <td class="marketCap">${"Mkt Cap: "+ "$"+item.total_volume}</td>
        `;
        table.appendChild(row);
    });
}

document.getElementById("search").addEventListener("keyup",event=>{
    const searchElement=document.getElementById("search").value.trim().toLowerCase();
    if(searchElement=='')
    {
        render(data);
        return;
    }
    const filterData=data.filter(item=>{
        const itemName=item.name.toLowerCase();
        const itemSymbol=item.symbol.toLowerCase();
        return itemName.includes(searchElement) || itemSymbol.includes(searchElement);
    })
    render(filterData);
})

document.getElementById("mkt_cap").addEventListener("click",() =>{
    data.sort((a,b)=>b.total_volume-a.total_volume);
    render(data);
})

document.getElementById("percent").addEventListener("click",()=>{
    data.sort((a,b)=>b.price_change_percentage_24h-a.price_change_percentage_24h);
    render(data);
})


async function fetchDetails(){
    try{
        const response=await fetch(endpoint,{method:'GET'});
        data=await response.json();
        render(data);
    }
    catch(e)
    {
        alert(e.message);
    }
}
fetchDetails();