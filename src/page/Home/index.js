import Header from "../../component/Header";
import clsx from "clsx";
import MainContent from "../../component/MainContent";
import Footer from "../../component/Footer";

function Home() {
    return (  
        <div className={clsx('wrapper')}>
            <Header scrollHeader={true}/>
            <MainContent/>
            <Footer/>
        </div>
    );
}

export default Home;