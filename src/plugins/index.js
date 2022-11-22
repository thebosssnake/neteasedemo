import { Swipe, SwipeItem ,Button,Popup ,Progress,Slider } from 'vant';
let plugins=[
    Swipe, SwipeItem ,Button,Popup,Progress,Slider 
]
export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}
