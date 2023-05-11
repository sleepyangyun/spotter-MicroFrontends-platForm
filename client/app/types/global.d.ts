declare module '*.svg' {
    const path: string;
    export default path;
}
declare module '*.png' {
    const path: string;
    export default path;
}

declare module '*.bmp' {
    const path: string;
    export default path;
}

declare module '*.gif' {
    const path: string;
    export default path;
}

declare module '*.jpg' {
    const path: string;
    export default path;
}

declare module '*.jpeg' {
    const path: string;
    export default path;
}

// TODO: 等后期antd能完全hold住该问题后再采用官方的解决方案
// 暴力覆盖moment类型, 临时解决Ddayjs替换moment后使用日期相关组件引发的类型错误问题
declare module 'moment' {
    import { Dayjs } from 'dayjs';

    namespace moment {
        type Moment = Dayjs;
    }
    export = moment;
    export as namespace moment;
}
