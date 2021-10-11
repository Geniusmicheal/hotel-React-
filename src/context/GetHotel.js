const apiListOfRoomsRecord = async (filter,setLoading, autoCompleteLocationApi,setHotelData,setRoomData) =>{
    setLoading(true);
    let center='';
    if(filter?.location){
        if(filter?.center){
            const a =(filter?.center).split(',');
            // center = `&name[like]=${filter?.location}`;
            center=`&latitude=${a[0]}&longitude=${a[1]}&radius=5000`;
        }else{
            await autoCompleteLocationApi(filter?.location).then(response => response.json()).then(dat_ =>{
                const dat= dat_.suggestions;
                center=`&latitude=${dat[0].latitude}&longitude=${dat[0].longitude}&radius=5000`;
            }).catch(err => console.error(err) );
            // center = `&name[like]=${filter?.location}`;
        }
    }
    // var proxyUrl ='https://thingproxy.freeboard.io/fetch/',
    // targetUrl = `https://sandbox.impala.travel/v1/hotels?start=${filter.fromDate}&end=${filter.toDate}${center}&size=15&offset=${filter.offset}`;

    var targetUrl = `https://www.9javiews.com.ng/api/hotels?start=${filter.fromDate}&end=${filter.toDate}${center}&size=15&offset=${filter.offset}`;
   
    await fetch(targetUrl,{
        "method": "GET",
        "headers": { "X-API-KEY": "sandb_ChgX6KXGZOBrxKxoWMJGtypnsK91sossu7YstE6g"}
    }).then(response => response.json()).then(data_ => {
        var roomList={},hotelList ={};
        if(data_.pagination){
            hotelList['pagination'] = data_.pagination;
            const data =data_.data;
            for (let i = 0; i < data.length; i++) {
                hotelList[data[i].hotelId] = {
                    'name': data[i].name,
                    'currency': data[i].currency,
                    'starRating': data[i].starRating,

                    'description': data[i].description,
                    'phoneNumbers': data[i].phoneNumbers,
                    'emails': data[i].emails,

                    'websiteUrl': data[i].websiteUrl,
                    'images': data[i].images,
                    'address': data[i].address,

                    'location': data[i].location,
                    'amenities': data[i].amenities,
                    'roomCount': data[i].roomCount,

                    'checkIn': data[i].checkIn,
                    'checkOut': data[i].checkOut,
                    'termsAndConditions': data[i].termsAndConditions,

                    'createdAt': data[i].createdAt,
                    'updatedAt': data[i].updatedAt,
                    'externalUrls': data[i].externalUrls,
                    'roomTypes': data[i].roomTypes,
                    'roomTypeId' :data[i].hotelId,
                    'type': 'hotels'
                }
                for (let count = 0; count < (data[i].roomTypes).length; count++) {
                    let rooms = (data[i].roomTypes)[count];
                    roomList[rooms.roomTypeId] = {
                        'hotelID': data[i].hotelId,
                        'roomTypeId' : rooms.roomTypeId,
                        'name' : rooms.name,
                        'description' : rooms.description,
                        'maxOccupancy' : rooms.maxOccupancy,
                        'rates' : rooms.rates,
                        'amenities' : rooms.amenities,
                        'images' : rooms.images,
                        'type': 'rooms'
                    }
                }
            }
        }
        setHotelData(hotelList);
        setRoomData(roomList);
    }).catch(err => console.error(err) );
    setLoading(false);
};
export default apiListOfRoomsRecord;