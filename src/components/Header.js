import logo from '../assets/film.svg'
import search from '../assets/search.png'

export default function Header(){
    return (
<div className="wrapper">
<div className="header">
<img src={logo} alt='film logo' />
 <div className="header__title">Films</div>
</div>
<div className='header_block'>
    <img src={search} alt='search_icon' />
    <input type="text" placeholder="поиск по сайту" className='header_search'/>
    </div>
</div>

    )
}