

// eslint-disable-next-line react/prop-types
export default function UserDataListItem({ itemType }) {


    // initialise the content to top tracks
    // let content = <li>
    //     <div className="itemImg">
    //         <a href="track/artist url"><img src="" alt="" /></a>
    //     </div>
    //     <h3>Artist name</h3>
    // </li>

    // change the content to artists layout if itemType is 'artists'
    if(itemType === 'artists') {
        // content = ''
    }


    return <li>
        <div className="itemImg">
            <a href="track/artist url"><img src="" alt="" /></a>
        </div>
        <h3>Artist name</h3>
    </li>
}