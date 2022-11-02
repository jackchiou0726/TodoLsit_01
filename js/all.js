

let data = [
    
];

const list = document.querySelector(".list");
const txt = document.querySelector(".txt");
const saveBtn = document.querySelector(".saveBtn");
const deleteBtn = document.querySelector(".deleteBtn");
const tab = document.querySelector(".tab");
const tabList = document.querySelectorAll(".tab li");
const count = document.querySelector(".count");
const cleanDone = document.querySelector(".cleanDone");

let toggleTab = "all";

// 渲染
function renderData() {
    let str = "";
    data.forEach((item,index) => {
        if(toggleTab == "all"){
            let content = `<li data-num="${index}">    
                        <lable class="checkBox" >
                            <input type="checkbox" ${item.isChecked}> 
                            <span>${item.title}</span> 
                        </lable>
                            
                        
                        <a href="#" class="deleteBtn">
                            <img src="img/cancel.jpg"  class="delete" alt="">
                        </a>
                    </li>`
        str += content;
        } else if(!item.isChecked && toggleTab == "undo"){
            let content = `<li data-num="${index}">    
                        <lable class="checkBox" >
                            <input type="checkbox" > 
                            <span>${item.title}</span> 
                        </lable>
                            
                        
                        <a href="#" class="deleteBtn">
                            <img src="img/cancel.jpg"  class="delete" alt="">
                        </a>
                    </li>`
        str += content;
        } else if(item.isChecked && toggleTab == "done"){
            let content = `<li data-num="${index}">    
                        <lable class="checkBox" >
                            <input type="checkbox" checked "> 
                            <span>${item.title}</span> 
                        </lable>
                            
                        
                        <a href="#" class="deleteBtn">
                            <img src="img/cancel.jpg"  class="delete" alt="">
                        </a>
                    </li>`
        str += content;
        }
        list.innerHTML = str;
    });
    
    
    // 有幾個待辦
    countundo();
}

// 新增
saveBtn.addEventListener("click",function(e){
    let obj = {}
    if (txt.value == ""){
        alert("請輸入待辦事項");
        return
    }
    obj.title = txt.value;
    obj.isChecked = "";
    data.push(obj);
    txt.value = "";
    renderData();
    countundo();

});

// 新增(Enter)
txt.addEventListener("keyup",(e) => {
    let obj = {}
    if(txt.value == ""){
        alert("請輸入文字")
        return
    } else if(e.key === "Enter"){
        obj.title = txt.value;
        obj.isChecked = "";
        data.push(obj);
        txt.value = "";
    }
    renderData();
    countundo();
});

// 刪除單筆資料&勾選狀態

list.addEventListener("click",function(e){
    let num = e.target.closest("li").dataset.num

    if(e.target.nodeName == "INPUT"){
        if(data[num].isChecked !== "checked"){
            data[num].isChecked = "checked"
        } else {
            data[num].isChecked = ""
        }
    }
    else if(e.target.getAttribute("class")=="delete"){
        data.splice(num,1)
        
    }
    renderData();
});

// 分類
tab.addEventListener("click",changeTab);
function changeTab(e){
    toggleTab = e.target.dataset.tab

    tabList.forEach((item) =>{
        item.classList.remove("active")
    })
    e.target.classList.add("active");
    renderData();
}

// 顯示幾筆待辦事項
function countundo() {
    
    let newArr = data.filter((item) => {return item.isChecked ==""})
    count.textContent = newArr.length;
}

//刪除已完成事項
cleanDone.addEventListener("click", cleanDoneList)
function cleanDoneList() { 
    let newData = data.filter((item) => {
        return item.isChecked == ""
    });

    data = newData;

    renderData(data);
    
}