


<iframe src="https://codesandbox.io/embed/animation001-tm0by?autoresize=1&fontsize=14&hidenavigation=1&theme=light&view=preview"
     style="width:100%; height:200px; border:0; border-radius: 4px; overflow:hidden;"
     title="animation_001"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


```tsx
import { useSpring, animated ,config} from 'react-spring';
import {useState } from 'react';

export default function App() {

  const [flip, set] = useState(false);
  const [num,setNum]=useState(200)
  const { number } = useSpring({
    reset: false,
    reverse: flip,
    from: { number: 10 },
    number: num,
    delay: 1200,
    config: config.gentle,
    onRest: () => set(!flip),
  })

  return <animated.div style={{
    width: number,
    height: 80,backgroundColor: 'rgb(69, 232, 145)',
    borderRadius: 16,}}>{number.to(n => n.toFixed(4))}</animated.div>
}
```
