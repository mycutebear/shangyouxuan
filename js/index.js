// 将dom元素及相关资源都加载结束后再来实现的事件函数
window.onload = function (){
    // 导航路径数据自动渲染
    navPathDatabind()
    function navPathDatabind(){
        // 获取页面导航的元素对象
    var navPath = document.querySelector('#wrapper #content .nav_path .clearfix');
    // 获取数据
    var path = goodData.path
    // 遍历数据开始
    for (let index = 0; index < path.length; index++) {
        // 创建节点
        if (index == path.length - 1) {
            let liNode = document.createElement('li');
            let aNode = document.createElement('a');
            aNode.append(path[index].title);
            liNode.append(aNode);
            navPath.append(liNode);
        }
        else {
            let liNode = document.createElement('li');
            let aNode = document.createElement('a');
            aNode.href = path[index].url;
            aNode.append(path[index].title);
            let emNode = document.createElement('em');
            emNode.append("/");
            liNode.append(aNode,emNode);
            navPath.append(liNode);
        }
        
    }
    // 遍历数据结束
    }
     // 记录点击的缩略图的下标
     let bigImgIndex = 0;
    // 放大镜的移入移出效果
    bigClassBind();
    function bigClassBind() {
        // 获取小图框元素
        let smallPic = document.querySelector('#wrapper #content .center .left .left_top .small_pic');
        //  获取上部分元素
        let leftTop = document.querySelector('#wrapper #content .center .left .left_top');
        // 绑定鼠标移入事件
        smallPic.onmouseenter = function(){
            // 创建蒙版元素
            let maskDiv = document.createElement('div');
            maskDiv.className = "mask";
            // 添加蒙版元素
            smallPic.append(maskDiv);
             // 创建大图框元素
             let bigPic = document.createElement('div');
             bigPic.className = "big_pic fl";
              //  创建大图片元素
            let bigImg = document.createElement('img');
            // 获取大图片的路径数据
            let bigPicSrc = goodData.imagessrc;
            bigImg.src = bigPicSrc[bigImgIndex].b;
             // 添加大图框元素
             leftTop.append(bigPic);
            // 添加大图片元素
            bigPic.append(bigImg);
            // 绑定移动事件
            smallPic.onmousemove = function(e){
                //蒙版移动设置
                let left = e.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2;
                let top = e.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight / 2;
                if (left < 0) {
                    left = 0;
                }
                if (top < 0) {
                    top = 0;
                }
                if (left > smallPic.clientWidth - maskDiv.offsetWidth) {
                    left = smallPic.clientWidth - maskDiv.offsetWidth
                }
                if (top > smallPic.clientHeight - maskDiv.offsetHeight) {
                    top = smallPic.clientHeight - maskDiv.offsetHeight
                }
                maskDiv.style.left = left + "px";
                maskDiv.style.top = top + "px";
                // 大图元素与蒙版元素移动的距离比
                let scale = (bigImg.clientWidth - bigPic.offsetWidth) / (smallPic.clientWidth - maskDiv.offsetWidth);
                bigImg.style.left = -left * scale + "px";
                bigImg.style.top = -top * scale + "px";

            }
            //绑定移出事件
            smallPic.onmouseleave = function(){
                maskDiv.remove();
                bigPic.remove();
            }
        }
    }
    // 放大镜底部缩略图数据动态渲染
    leftBottomDatabind();
    function leftBottomDatabind() {
        // 获取数据
        let path = goodData.imagessrc;
        // 获取缩略图页面元素对象
        let thumbnail = document.querySelector('#wrapper #content .center .left .left_bottom ul');
        // 遍历数据自动生成li和img元素对象
        for (let index = 0; index < path.length; index++) {
            let liNode = document.createElement('li');
            let imgNode = document.createElement('img');
            imgNode.src = path[index].s;
            // 添加li和img元素对象
            liNode.append(imgNode);
            thumbnail.append(liNode);
        }
       
    }
    // 实现点击缩略图大图也跟着变化的效果
    clickThumbnail();
    function clickThumbnail() {
        // 获取所有的li元素对象
        let liNodes = document.querySelectorAll('#wrapper #content .center .left .left_bottom ul li');
        // 获取小图片元素
        let smallPicImg = document.querySelector('#wrapper #content .center .left .left_top .small_pic img');
        let imgSrc = goodData.imagessrc;
        // 循环每一个li元素给li元素绑定点击事件
        for (let index = 0; index < liNodes.length; index++) {
            liNodes[index].onclick = function () {
                bigImgIndex = index;
                // 动态修改小图片路径
                smallPicImg.src = imgSrc[bigImgIndex].s;
            }
        }
    }
    // 点击缩略图左右箭头的效果
    clickThumbnailLeftRight();
    function clickThumbnailLeftRight() {
        // 获取左右箭头元素
        let left = document.querySelector('#wrapper #content .center .left .left_bottom a:first-child');
        let right = document.querySelector('#wrapper #content .center .left .left_bottom a:last-child');
        // 获取div元素
        let divNode = document.querySelector('#wrapper #content .center .left .left_bottom #thumbnail_list');
        // 获取ul元素
        let ulNode = document.querySelector('#wrapper #content .center .left .left_bottom #thumbnail_list ul');
        // 获取li元素的对象
        let liNodes = document.querySelectorAll('#wrapper #content .center .left .left_bottom #thumbnail_list ul li');  
        // 列表位移起点
        let start = 0;
        // 位移步长
        let step = (liNodes[0].offsetWidth+20) * 2;
        // 总位移长度
        let endPosition = (liNodes.length-5) * (liNodes[0].offsetWidth+20);
        // 左右箭头绑定事件发生函数
        right.onclick = function() {
            start-=step;
            if(start < -endPosition){
                start = -endPosition;
            } 
            ulNode.style.left = start + 'px';
        }
        left.onclick = function() {
            start+=step;
            if(start > 0){
                start = 0;
            } 
            ulNode.style.left = start + 'px';
        }
    }
    // 动态渲染商品详情页面的数据
    goodsDetail();
    function goodsDetail() {
        // 获取商品详情区域的对象
        let topInformation = document.querySelector('#wrapper #content .center #right #top_information');
        // 获取商品详情的数据
        let goodsInformation = goodData.goodsDetail;
        // 创建模板字符串
        let dataString = ` <h3>
        ${goodsInformation.title}
    </h3>
    <p>
    ${goodsInformation.recommend}
    </p>
    <div id="price_information">
            <div class="top_price clearfix">
                <span>价&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                <div class="fl">
                    <i>￥</i>
                    <em>${goodsInformation.price}</em>
                    <span>降价通知</i>
                </div> 
                <p>
                    <i>累计评价</i>
                    <span>${goodsInformation.evaluateNum}</span>
                </p>
            </div>
            <div class="bottom_price clearfix">
                <span>促&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                <div>
                    <span>${goodsInformation.promoteSales.type}</span>
                    <i>
                    ${goodsInformation.promoteSales.content}
                    </i>
                </div>
            </div>
    </div>
    <p class="clearfix">
        <span>支&nbsp;&nbsp;&nbsp;&nbsp;持</span>
        <i>
        ${goodsInformation.support}
        </i>
    </p>
    <p class="clearfix">
        <span>配送至</span>
        <i>
        ${goodsInformation.address}
        </i>
    </p>`
    topInformation.innerHTML = dataString;
    }
    // 商品参数数据动态渲染
    parametersData();
    function parametersData() {
        // 获取商品参数区域对象
        let chooseWrap = document.querySelector('#wrapper #content .center #right #bottom_parameters .choose_wrap');
        // 获取商品参数数据
        let goodsParameters = goodData.goodsDetail.crumbData;
        // 循环创建并添加dl
        for (let index = 0; index < goodsParameters.length; index++) {
            let dlNode = document.createElement('dl');
            chooseWrap.append(dlNode);
            // 创建dt
            let dtNode = document.createElement('dt');
            // 在dt中添加数据
            dtNode.append(goodsParameters[index].title);
            // 在dl中添加dt
            dlNode.append(dtNode);
            // 动态创建dd元素
            for (let i = 0; i < goodsParameters[index].data.length; i++) {
                // 创建dd元素
                let ddNode = document.createElement('dd');
                // 获取dd里面的数据
                let typeData = goodsParameters[index].data[i].type;
                // 给每个dd设置changePrice属性存储变化的价格
                ddNode.setAttribute('changePrice',goodsParameters[index].data[i].changePrice);
                // 把数据添加到dd元素中
                ddNode.append(typeData);
                // 将dd添加到dl中
                dlNode.append(ddNode);
            }
        }
    }
    // 点击商品参数之后的排他效果
    clilckddBind()
    function clilckddBind() {
        // 获取所有的dl元素
        let dlNodes = document.querySelectorAll('#wrapper #content .center #right #bottom_parameters .choose_wrap dl');
        // 获取选择结果区域元素
        let chooseNode = document.querySelector('#wrapper #content .center #right #bottom_parameters .choose');
        // 设置数组存放点击后的mark元素的数据
        let markData = new Array(dlNodes.length);
        // 循环dl对象
        for (let i = 0; i < dlNodes.length; i++) {
            // 获取dl中所有的dd
            let ddNodes = dlNodes[i].querySelectorAll('dd');
            // dd循环绑定点击事件
            for (let k = 0; k < ddNodes.length; k++) {
                ddNodes[k].onclick = function() {
                    // 处理点击事件前清空choose区域里面的内容
                    chooseNode.innerHTML = '';
                    // 点击li时遍历所有的dd将颜色设置为初始值
                    for (let j = 0; j < ddNodes.length; j++) {
                        ddNodes[j].style.color = '#666';
                    }
                    // 把触发事件的对象设置为红色
                    this.style.color = 'red';
                    // 点击后动态创建mark元素
                    markData[i] = this;
                    // 遍历数组中的数据创建并添加mark标签
                    markData.forEach((element,index,markData) => {
                        if (markData[index] != null) {
                            let divNode = document.createElement('div');
                            divNode.id = 'mark';
                            divNode.append(element.innerText);
                            let aNode = document.createElement('a');
                            aNode.innerText = "x";
                            // 给每个a标签添加一个属性值便于后续的删除操作
                            aNode.setAttribute('index',index);
                            divNode.append(aNode);
                            chooseNode.append(divNode);
                        }
                        
                    });
                    // 改变价格
                    changePrice(markData);
                    // 获取所有的a元素
                    let aNodes = document.querySelectorAll ('#wrapper #content .center #right #bottom_parameters .choose #mark a');
                    // 遍历每个a元素绑定点击事件
                    for (let g = 0; g < aNodes.length; g++) {
                        aNodes[g].onclick = function() {
                            // 点击后修改存放mark节点的数据
                            let index1 = this.getAttribute('index');
                            markData[index1] = null;
                            // 删除mark元素
                            this.parentNode.remove();
                            // 获取对应行的所有dd元素
                            let ddNodes = dlNodes[index1].querySelectorAll('dd');
                            // 遍历设置所有的dd元素
                            for (let n = 0; n < ddNodes.length; n++) {
                                ddNodes[n].style.color = '#666';
                            }
                            ddNodes[0].style.color = 'red';
                            changePrice(markData);
                        }       
                    }
                }        
            }
            
        }
    }
    // 价格变化效果
    function changePrice(markData){
        // 获取价格元素
        let price = document.querySelector('#wrapper #content .center #right #top_information #price_information .top_price div em');
         // 获取选择搭配中商品价格的元素
        let goodPrice = document.querySelector('#wrapper #content .relatedproduct .choose_product .bottom .left p span');
        // 初始价格
        // let initPrice = goodData.goodsDetail.price;
        let currentPrice = initPrice;
        // 遍历计算变化后的价格
        for (let i = 0; i < markData.length; i++) {
            if(markData[i] != null) {
                let change = Number(markData[i].getAttribute('changeprice'));
                // 当前价格
                currentPrice = currentPrice + change;
            }
        }
        price.innerText = currentPrice;
         // 选择搭配中商品价格的动态变化
         goodPrice.innerText = currentPrice;
         choosePrice(currentPrice);
    }
    // 套餐价格变动的效果
    function choosePrice(currentPrice){
        // 获取所有复选框元素
        let inputNode = document.querySelectorAll('#wrapper #content .relatedproduct .choose_product .bottom ul li div input');
        // 获取添加搭配后的价格元素
        let packagePrice = document.querySelector('#wrapper #content .relatedproduct .choose_product .bottom .all_choose i');
        // 页面刷新时就计算套餐价格
        let initPrice = currentPrice;
        for (let j = 0; j < inputNode.length; j++) {
            if(inputNode[j].checked){
                // 复选框被选中就将总价修改
                theChange = inputNode[j].nextElementSibling.innerText;
                initPrice = initPrice + Number(theChange);
            }
        }
        packagePrice.innerText = initPrice;
        // 每个复选框添加点击事件,点击后重新计算套餐价格
        for (let i = 0; i < inputNode.length; i++) {
            inputNode[i].onclick = function() {
                let newPrice = currentPrice;
                // 点击后遍历每个复选框是否是被选中
                for (let j = 0; j < inputNode.length; j++) {
                    if(inputNode[j].checked){
                        // 复选框被选中就将总价修改
                        theChange = inputNode[j].nextElementSibling.innerText;
                        newPrice = newPrice + Number(theChange);
                    }
                }
                packagePrice.innerText = newPrice;
            }
        }
         // 添加后的价格追加到元素中
         
    }
     // 商品初始价格
     let initPrice = goodData.goodsDetail.price;
    //  套餐价格变化价格
     choosePrice(initPrice);
    //  实现点击后选项卡的切换的事件处理函数
    function toggleTabs(liNode,divNode) {
        for (let j = 0; j < liNode.length; j++) {
            liNode[j].index = j;
            liNode[j].onclick = function() {
                // 点击时遍历所有的选项和对应详情将类名设置为空
            for (let i = 0; i < liNode.length; i++) {
                liNode[i].className = null;
                divNode[i].className = null;
            }
            // 将被点击的对象类名修改
            this.className = "active";
            // 获取选项卡当前的下标
            // 将选项卡的详情介绍同时修改
            divNode[this.index].className = 'active';
            }
        }
        
    }
    // 商品介绍切换效果
    goodToggleTabs();
    function goodToggleTabs() {
         // 获取所有选项卡元素
        let liNodes = document.querySelectorAll('#wrapper #content .relatedproduct .moredetail .list1 li');
        // 获取随选项卡切换的所有元素
        let divNodes = document.querySelectorAll('#wrapper #content .relatedproduct .moredetail div');
        toggleTabs(liNodes,divNodes);
    }
    // 侧边栏切换效果
    asidetoggleTabs();
    function asidetoggleTabs() {
        // 获取侧边栏的选项卡
    let asideTabs = document.querySelectorAll('#wrapper #content .relatedproduct aside .aside_top h4');
    let asideTabsDetail = document.querySelectorAll('#wrapper #content .relatedproduct aside .aside_bottom >div');
    toggleTabs(asideTabs,asideTabsDetail);
    }
    // 右边侧边栏点击后收起的效果
    rightAside();
    function rightAside() {
        // 获取按钮元素
        let btns = document.querySelector('#wrapper .right_aside .btns');
        // 获取侧边栏元素
        let rightAsideNode = document.querySelector('#wrapper .right_aside');
        // 记录侧边栏状态
        let flag = 0;
        btns.onclick = function() {
            // 判断侧边栏状态
            if (flag == 0) {
                flag = 1;
                btns.className = 'btns';
                rightAsideNode.className = 'right_aside'
            }
            else{
                flag = 0;
                btns.className = 'btns btns_close';
                rightAsideNode.className = 'right_aside aside_close'
            }
        }
    }
}

