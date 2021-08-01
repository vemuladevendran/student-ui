import ss from './loader.module.css';

export default function Loader() {
    return (
        <div className={`${ss.loader_wrapper}`}>
            <div className={`${ss.loader} text-white text-center fw-bold h6`}>L</div>
            <div className={`${ss.loader} text-white text-center fw-bold h6`}>O</div>
            <div className={`${ss.loader} text-white text-center fw-bold h6`}>A</div>
            <div className={`${ss.loader} text-white text-center fw-bold h6`}>D</div>
            <div className={`${ss.loader} text-white text-center fw-bold h6`}>I</div>
            <div className={`${ss.loader} text-white text-center fw-bold h6`}>N</div>
            <div className={`${ss.loader} text-white text-center fw-bold h6`}>G</div>
        </div>
    );
}