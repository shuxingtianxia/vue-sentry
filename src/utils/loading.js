import Vue from 'vue'
import { Progress } from 'element-ui'
Vue.use(Progress) // 进度条

export const progress = (percent) => {
  if (percent) {
    if (window.$load) {
      window.$load.innerHTML = `<div class="progress">
                                  <div class="progress-bar" style="width:${percent}%;transition:${percent}% .6s ease;-o-transition: ${percent}% .6s ease;-webkit-transition: ${percent}% .6s ease;">
                                    <div class="progress-value">${percent}%</div>
                                  </div>
                                </div>`
    } else {
      window.$load = document.createElement('div')
      window.$load.className = 'load-block'
      window.$load.innerHTML = `<div class="progress">
                                  <div class="progress-bar" style="width:${percent}%;transition:${percent}% .6s ease;-o-transition: ${percent}% .6s ease;-webkit-transition: ${percent}% .6s ease;">
                                    <div class="progress-value">${percent}%</div>
                                  </div>
                                </div>`
      document.body.appendChild(window.$load)
    }
    if (percent === 100) {
      setTimeout(function() {
        window.$load && document.body.removeChild(window.$load)
        window.$load = undefined
      }, 2000)
    }
  } else if (window.$load) {
    document.body.removeChild(window.$load)
    window.$load = undefined
  }
}
