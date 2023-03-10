import React from "react";
import axios from "axios";
import Calendar from 'react-calendar';
import moment from 'moment';
import DailyBattleLog from './record_tbody';

const url = process.env.REACT_APP_BASE_URL;
const diffKST = 9 * 60 * 60 * 1000;
const typeList = ['all', 'trophyLeague', 'powerLeague', 'clubLeague', 'challenge'];
const modeList = ['gemGrab', 'brawlBall', 'bounty', 'heist', 'hotZone', 'knockout', 'dual', 'soloShowdown', 'duoShowdown']

export default () => {
    const today = React.useRef(new Date(
        new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime() + diffKST));
    const tomorrow = React.useRef(
        new Date(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1).getTime() + diffKST));
    const battleLog = React.useRef([]);
    const gameMode = React.useRef('all');
    const gameType = React.useRef('all');
    const [radio, setRadio] = React.useState('all');
    const [checkBox, setChecked] = React.useState(false);
    const [season, setSeason] = React.useState({});
    const [maps, setMaps] = React.useState([]);

    React.useEffect(() => {
        axios.get(`${url}/record`, {
            params: {
                today: today.current,
                tomorrow: tomorrow.current,
                type: gameType.current,
                mode: gameMode.current
            },
        }).then(async (result) => {
            await setSeason(result.data.season);
            await setMaps(result.data.rotation);
            battleLog.current = result.data.members.sort((a, b) => {
                return b.battles.length - a.battles.length;
            });
        });
    }, [battleLog.current, today, tomorrow]);

    const getData = () => {
        axios.get(`${url}/record`, {
            params: {
                today: today.current,
                tomorrow: tomorrow.current,
                type: gameType.current,
                mode: gameMode.current
            },
        }).then(async (result) => {
            console.log(result.request.responseURL);
            battleLog.current = result.data.members.sort((a, b) => {
                return b.battles.length - a.battles.length;
            });
        });
    }

    const handleRadioButton = (e) => {
        gameMode.current = modeList.includes(e.target.value) ? e.target.value : 'all';
        gameType.current = typeList.includes(e.target.value) ? e.target.value : 'all';
        setRadio(e.target.value)
        getData();
    }

    const startDate = new Date(season.start_date);
    startDate.setDate(startDate.getDate() - 1);

    return (
        <div className={'flex_box'}>
            <div>
                <nav className={'nav__game_mode_box'}>
                    <label>
                        <input type="radio" className={'nav__radio'}
                               value={'all'}
                               checked={radio === 'all'}
                               onChange={handleRadioButton}/>
                        <img className={'nav__all'}
                             src={'/images/game_mode/all.webp'} alt={'??????'}/>
                    </label>
                    <label>
                        <input type="radio" className={'nav__radio'}
                               value={'trophyLeague'}
                               checked={radio === 'trophyLeague'}
                               onChange={handleRadioButton}/>
                        <img className={'nav__items'}
                             src={'/images/game_mode/trophyLeague.webp'} alt={'????????? ??????'}/>
                    </label>
                    <label>
                        <input type="radio" className={'nav__radio'}
                               value={'powerLeague'}
                               checked={radio === 'powerLeague'}
                               onChange={handleRadioButton}/>
                        <img className={'nav__items'}
                             src={'/images/game_mode/powerLeague.webp'} alt={'?????? ??????'}/>
                    </label>
                    <label>
                        <input type="radio" className={'nav__radio'}
                               value={'gemGrab'}
                               checked={radio === 'gemGrab'}
                               onChange={handleRadioButton}/>
                        <img className={'nav__item'}
                             src={'/images/game_mode/gemGrab.webp'} alt={'??? ??????'}/>
                    </label>
                    <label>
                        <input type="radio" className={'nav__radio'}
                               value={'brawlBall'}
                               checked={radio === 'brawlBall'}
                               onChange={handleRadioButton}/>
                        <img className={'nav__item'}
                             src={'/images/game_mode/brawlBall.webp'} alt={'?????? ???'}/>
                    </label>
                    <label>
                        <input type="radio" className={'nav__radio'}
                               value={'bounty'}
                               checked={radio === 'bounty'}
                               onChange={handleRadioButton}/>
                        <img className={'nav__item'}
                             src={'/images/game_mode/bounty.webp'} alt={'?????????'}/>
                    </label>
                    <label>
                        <input type="radio" className={'nav__radio'}
                               value={'heist'}
                               checked={radio === 'heist'}
                               onChange={handleRadioButton}/>
                        <img className={'nav__item'}
                             src={'/images/game_mode/heist.webp'} alt={'????????????'}/>
                    </label>
                    <label>
                        <input type="radio" className={'nav__radio'}
                               value={'hotZone'}
                               checked={radio === 'hotZone'}
                               onChange={handleRadioButton}/>
                        <img className={'nav__item'}
                             src={'/images/game_mode/hotZone.webp'} alt={'??? ???'}/>
                    </label>
                    <label>
                        <input type="radio" className={'nav__radio'}
                               value={'knockout'}
                               checked={radio === 'knockout'}
                               onChange={handleRadioButton}/>
                        <img className={'nav__item'}
                             src={'/images/game_mode/knockout.webp'} alt={'?????????'}/>
                    </label>
                    <label>
                        <input type="radio" className={'nav__radio'}
                               value={'dual'}
                               checked={radio === 'dual'}
                               onChange={handleRadioButton}
                               disabled={true}/>
                        <img className={'nav__item'}
                             src={'/images/game_mode/dual.webp'} alt={'??????'}/>
                    </label>
                    <label>
                        <input type="radio" className={'nav__radio'}
                               value={'soloShowdown'}
                               checked={radio === 'soloShowdown'}
                               onChange={handleRadioButton}
                               disabled={true}/>
                        <img className={'nav__item'}
                             src={'/images/game_mode/soloShowdown.webp'} alt={'?????? ?????????'}/>
                    </label>
                    <label>
                        <input type="radio" className={'nav__radio'}
                               value={'duoShowdown'}
                               checked={radio === 'duoShowdown'}
                               onChange={handleRadioButton}/>
                        <img className={'nav__item'}
                             src={'/images/game_mode/duoShowdown.webp'} alt={'?????? ?????????'}/>
                    </label>
                    <label>
                        <input type="radio" className={'nav__radio'}
                               value={'clubLeague'}
                               checked={radio === 'clubLeague'}
                               onChange={handleRadioButton}/>
                        <img className={'nav__item'}
                             src={'/images/game_mode/clubLeague.webp'} alt={'?????? ??????'}/>
                    </label>
                    <label>
                        <input type="radio" className={'nav__radio'}
                               value={'challenge'}
                               checked={radio === 'challenge'}
                               onChange={handleRadioButton}/>
                        <img className={'nav__item'}
                             src={'/images/game_mode/challenge.webp'} alt={'?????????'}/>
                    </label>
                </nav>
                <div className={'nav__date_box'}>
                    <div>
                        <span>???</span>???????????? ?????? ????????? ????????? ????????? ????????????<span>???</span>
                    </div>
                    <label>
                        <input type="checkbox" className={'nav__checkbox'}
                               onChange={() => {
                                   setChecked(!checkBox)
                               }}
                               checked={checkBox}/>
                        <div className={'nav__date_box_content'}>{moment(today.current).format("YYYY??? MM??? DD???")}</div>
                    </label>
                </div>
                <div style={{display: `${checkBox ? 'block' : 'none'}`}}>
                    <Calendar onChange={(element) => {
                        today.current = new Date(new Date(element).getTime() + diffKST);
                        tomorrow.current = new Date(new Date(new Date(element).setDate(element.getDate() + 1)).getTime() + diffKST);

                        getData();
                    }}
                              value={today.current}
                              calendarType="US"
                              minDate={startDate}
                              maxDate={new Date()}
                              formatDay={(locale, date) => moment(date).format('D')}/>
                </div>
            </div>
            <div>
                <DailyBattleLog gameMode={gameMode.current}
                                battleLog={battleLog.current}
                                maps={maps}/>
            </div>
        </div>
    );
}