(function () {
    const startMenu = document.querySelector(".start-menu");
    const loader = document.querySelector(".loader-wrapp");
    const startMenuBtn = document.querySelector(".button-start-menu");
    const desktop = document.querySelector('.desktop');
    const date = new Date();
    const timeEl = document.querySelector(".time");
    const time = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });


    var deskItem = document.querySelectorAll(".desk-item");


    deskItem.forEach(item => {

        var innerItemWidth = item.offsetWidth;
        var innerItemHeight = item.offsetHeight;

        var l = desktop.offsetLeft + 15;
        var t = desktop.offsetTop + 15;
        var h = desktop.offsetHeight;
        var w = desktop.offsetWidth;

        var maxx = l + w - innerItemWidth;
        var maxy = l + h - innerItemHeight;
        var movable = false;



        item.onmousedown = function (event) { // (1) start the process
            movable = true;
           
            item.style.position = 'absolute';
            item.style.zIndex = 1000;
            
            desktop.append(item);
            

            moveAt(event.pageX, event.pageY);

          
            function moveAt(pageX, pageY) {
                if (movable) {
                    if (pageY <= maxy && pageY >= t) {
                        item.style.top = pageY - 15 + 'px';
                    }

                    if (pageX <= maxx && pageX >= l) {
                        item.style.left = pageX - 15 + 'px';
                    }
                }


            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            
            document.addEventListener('mousemove', onMouseMove);

            
            item.onmouseup = function () {

                document.removeEventListener('mousemove', onMouseMove);
                item.onmouseup = null;
                movable = false;
                console.log(movable)

            };

            item.ondragstart = function () {
                return false;
            };
            

        };
    })




    function hideLoader() {
        loader.style.display = "none"
    }

    function toggleMenu() {
        startMenu.classList.toggle('active');
    }

    setTimeout(hideLoader, 3000);

    startMenuBtn.addEventListener("click", toggleMenu);
    document.addEventListener("click", function (e) {
        e.preventDefault();
        let el = e.target;
        if (el.parent !== startMenu && el !== startMenuBtn && !startMenu.contains(e.target)) {
            startMenu.classList.remove('active');
        }
    })

    timeEl.textContent = time;
})()