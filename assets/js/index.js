


(function (window, document) {
    const methods = {
        appendChild(parent, ...children) {
            children.forEach(el => {
                parent.appendChild(el)
            })
        },
        $(selector, root = document) {
            return root.querySelector(selector)
        },
        $(selector, root = document) {
            return root.querySelectorAll(selector)
        }
    }


    let Img = function (options) {
        this._init(options);
        this._createElement()
        this._bind()
        this._show()
    }


    //图片的初始化和分类
    Img.prototype._init = function ({ data, initType, parasitifer }) {
        this.types = ['全部']  //所有分类
        this.all = []  //所有图片 
        this.classified = { '全部': [] }  //按照类型分类后的图片
        this.curType = initType  //当前显示的图片分类
        this.parasitifer = methods.$(parasitifer);  //挂载点
        this.imgContainer = null;  //所有图片的容器
        this.wrap = null  //整体容器
        this.typeBtnEls = null  //所有分类按钮组成的数组
        this.figures = null  // 所有当前显示的图片组成的数组

        this._classify(data)

        console.log(this.classified)
    }

    Img.prototype._classify = function () {
        let srcs = [];

        data.forEach(({ title, type, alt, src }, index) => {
            if (!this.types.includes(type)) {
                this.types.push(type)
            }

            if (!Object.keys(this.classified).includes(type)) {
                this.classified[type] = [];
            }

            if (!srcs.includes(src)) {
                srcs.push(src)

                let figure = document.createElement('figure')
                let img = document.createElement('img')
                let figcaption = document.createElement('figcaption')

                img.src = src
                img.setAttribute('alt', alt)
                figcaption.innerText = title


                methods.appendChild(figure, img, figcaption)
                this.all.push(figure)
                this.classified[type].push(this.all.length - 1)
            } else {
                //去all中，找到对应的图片，添加到对应的分类中
                this.classified[type].push(srcs.findIndex(s1 => s1 === src))

            }

        })
    }
    Img.prototype._getImgsByType = function (type) {
        return type === '全部' ? [...this.all] : this.classified[type].map(index => this.all[index])
    }


    Img.prototype._createElement = function () {
        let typesBtn = []

        for (let type of this.types.values()) {
            typesBtn.push(
                `<li class="__Img__classify__type-btn${type === this.curType ? ' __Img__type-btn-active' : ''}"> ${type}</li> `
            )
        }

        let tamplate = `
        <ul class="__Img__classify">
            ${typesBtn.join('')}
        </ul>
        <div class="__Img__img-container"></div>
        `

        let wrap = document.createElement('div')
        wrap.className = '__Img__container'
        wrap.innerHTML = tamplate
        this.imgContainer = methods.$('.__Img__img-container',wrap)
        methods.appendChild(this.imgContainer,...this._getImgsByType(this.curType))

        this.wrap = wrap
        this.typeBtnEls = methods.$$('.__Img__classify__type-btn',wrap)
        this.figures= methods.$$('figure', wrap)

        let overlay = document.createElement('div')
        overlay.className = '__Img__overlay'
        overlay.innerHTML = `
        <div class="__Img__overlay-pre-btn"></div>
        <div class="__Img__overlay-next-btn"></div>
        <img src="" alt="">
        `
        methods.appendChild(this.wrap, overlay)
        this.overlay = overlay
        this.previewImg = methods.$('img',overlay)

          
    }
    Img.prototype._bind = function () {

    }
    Img.prototype._show = function () {
        
    }

    window.$Img = Img;

})(window, document)



