import { useContext } from 'react';
import { ServiceContext } from '../ContextApi';

function Pagination() {
    const cardContext_ = useContext(ServiceContext);
    const {hotelData, apiListOfRoomsRecord,setLoading, autoCompleteLocationApi,setHotelData,setRoomData } = cardContext_;
    if(hotelData?.pagination){
        const pagination_ = hotelData?.pagination;
        let last =(pagination_.total)%(pagination_.count)>0?parseInt((pagination_.total)/(pagination_.count))+1:parseInt((pagination_.total)/(pagination_.count));

        const onPaginat_ = async e => {
            // console.log(e.target);
            let pageUrl = (pagination_.prev)?(pagination_.prev):(pagination_.next);
            pageUrl = (pageUrl.split('?'))[1].split('&');
            let offset=0;

            if(e.target.id ==='prev' && pagination_.prev){
                pageUrl = ((pagination_.prev).split('?'))[1].split('&');
                offset = pageUrl[(pageUrl.length - 1)].split('=')[1];
            }else if(e.target.id ==='next' && (pagination_.next)){
                pageUrl = ((pagination_.next).split('?'))[1].split('&');
                offset = pageUrl[(pageUrl.length - 1)].split('=')[1];
            }else
                offset = (e.target.id)*(pagination_.count);

            let formData = {
                fromDate: pageUrl[0].split('=')[1],
                toDate: pageUrl[1].split('=')[1],
                offset:offset
            }
            await apiListOfRoomsRecord(formData,setLoading, autoCompleteLocationApi,setHotelData,setRoomData);
        }
        // next: "https://sandbox.impala.travel/v1/hotels?start=2021-09-17&end=2021-09-18&size=15&offset=15"


        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item disabled"  key="prev">
                        <a className="page-link"  onClick={onPaginat_} id="prev">Previous</a>
                    </li>

                    {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li> */}

                    <li className="page-item"  key="next">
                        <a className="page-link" onClick={onPaginat_} id="next">Next</a>
                    </li>
                </ul>
            </nav>
        ) 
    }else return (<></>);
 
}

export default Pagination
