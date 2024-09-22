import Header from "../../component/Header";
import clsx from "clsx";

function Home() {
    return (  
        <div className={clsx('wrapper')}>
            <Header/>
            <div className={clsx('container')}>

            </div>
            <footer className={clsx('footer')}>

            </footer>
        </div>
    );
}

export default Home;