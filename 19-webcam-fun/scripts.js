const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function tooglePlay(event) {
    // (video.paused) ? video.play() : video.pause()
    const method = video.paused ? 'play' : 'pause'
    video[method]()
}

function getVideo() {
    navigator.mediaDevices.getUserMedia({video:true, audio: false})
    .then(localMediaStream => {
        // URL.createObjectURL with media streams is deprecated and will be removed in M68, around July 2018. Please use HTMLMediaElement.srcObject instead.
        try {
            video.srcObject = localMediaStream
        } catch (error) {
            video.src = window.URL.createObjectURL(localMediaStream)
        }
        // video.play()
    })
    .catch(errors => {
        console.error(errors);
    })
}

function paintToCanvas() {
    const { videoWidth: width, videoHeight: height } = video
    canvas.width = width
    canvas.height = height

    return setInterval(()=>{
        ctx.drawImage(video, 0, 0, width, height)
        
        let pixels = ctx.getImageData(0, 0, width, height)
        // pixels = rgbSplit(pixels)
        // ctx.globalAlpha = 0.8
        pixels = greenScreen(pixels)
        ctx.putImageData(pixels, 0, 0)
    }, 16)
}

// Filters
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100
        pixels.data[i + 1] = pixels.data[i + 1] - 50
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5
    }
    return pixels
}
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - 150] = pixels.data[i + 0]
        pixels.data[i + 500] = pixels.data[i + 1]
        pixels.data[i - 550] = pixels.data[i + 2]
    }
    return pixels
}
function greenScreen(pixels) {
    const levels = {}

    document.querySelectorAll('.rgb input').forEach(input => {
        levels[input.name] = input.value
    })

    for (let i = 0; i < pixels.data.length; i+=4) {
        red = pixels.data[i + 0]
        green = pixels.data[i + 1]
        blue = pixels.data[i + 2]
        alpha = pixels.data[i + 3]

        if (
            red >= levels.rmin && 
            green >= levels.gmin && 
            blue >= levels.bmin && 
            red <= levels.rmax && 
            green <= levels.gmax && 
            blue <= levels.bmax
        ) {
            pixels.data[i + 3] = 0            
        }
        
        // pixels.data[i + 0]
        // pixels.data[i + 1]
        // pixels.data[i + 2]
    }
    return pixels
}

function takePhoto() {
    // Play the snap
    snap.currentTime = 0
    snap.play()

    // 
    const data = canvas.toDataURL('image/jpeg')
    
    const b64Image = document.createElement('img')
    const link = document.createElement('a')
    link.setAttribute('download', 'handsome')
    // link.textContent = "Download"
    b64Image.src = data
    link.href = data
    link.appendChild(b64Image)

    strip.appendChild(link, strip.firstChild)
}

getVideo()
video.addEventListener('click', tooglePlay)
video.addEventListener('canplay', paintToCanvas)