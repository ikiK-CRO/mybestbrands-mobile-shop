import GLOBAL from '@/global.js'
import Toast from 'react-native-root-toast'

const toast = (color, text) => {
  Toast.show(text, {
    duration: 5000,
    position: Toast.positions.TOP,
    backgroundColor: color,
    shadowColor: 'black',
    containerStyle: {
      marginTop: 80,
      marginStart: '60%',
      minWidth: 150,
      minHeight: 40,
      zIndex: 100
    }
  })
}

const formatPrice = price => {
  let arr = price.toString().split('')
  arr.splice(-2, 0, ',')
  return arr.join('')
}



export {
  toast,
  formatPrice
}
