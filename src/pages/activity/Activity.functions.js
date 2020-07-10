// import Config from '../../config';

// export async function getActivityList(props)
// {
//     const activityUrl = `${Config.basePath}/activity`;
//         fetch(activityUrl)
//         .then((response) =>
//         {
//             return response.json();
//         })
//         .then((result) => 
//         {
//             this.setState({
//                 activities: result.map((item) =>
//                 {
//                     // return <ActivityItem
//                     //     key={item._id} 
//                     //     // why didn't the key attribute work but id did when sending it through props
//                     //     id={item._id}
//                     //     activity={item.activity}
//                     //     description={item.description}
//                     //     duration={item.duration}
//                     //     start={item.start}
//                     //     editActivity={this.editActivity}
//                     //     deleteActivity={this.deleteActivity}
//                     //      />
//                 }),
//             })
//         })
// }