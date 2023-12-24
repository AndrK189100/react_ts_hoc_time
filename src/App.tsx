import React, {useState} from 'react';


type Props = {
    date?: string;
    url?: string;
    list?: Props[];
}

function DateTime(props: Props) {
    return (
        <p className="date">{props.date}</p>
    )
}

const DateTimePretty = (Component: React.ComponentType) => {
    
    return class extends React.Component {

        static displayName = 'chg_date_view';
        
        changeDateView() {

            const now = Date.now();
            const date = Date.parse(this.props.date)
            
            if((now - date) < 3600000) return '12 минут назад';
            if ((now - date) > (3600000*24)) return `${Math.floor((now-date) / (3600000*24))} дней назад`;
            return '5 часов назад';
        }
        
        render() {
            return <Component date={this.changeDateView()}/>
        }
    };

    }

const DTP = DateTimePretty(DateTime);    

function Video(props: Props) {
    return (
        <div className="video">
            <iframe src={props.url} allow="autoplay; encrypted-media" allowFullScreen></iframe>
            {/* <DateTime date={props.date} /> */}
            <DTP date={props.date}/>
        </div>
    )
}

function VideoList(props: Props) {
    if(props.list) return props.list.map((item) => <Video url={item.url} date={item.date}/>);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}