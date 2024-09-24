import Header from "../../component/Header";
import clsx from "clsx";
import MainContent from "../../component/MainContent";

function Home() {
    return (  
        <div className={clsx('wrapper')}>
            <Header/>
            <MainContent/>
            <footer className={clsx('footer')}>

            </footer>
        </div>
    );
}

export default Home;