import axios from "axios";

const url = 'https:randomuser.me/api/?nat=us';

//500
for(let i = 0; i < 1; i++){
    await generateUser();
}

async function generateUser(){
    return new Promise((resolve) => {
        axios.get(url).then(function (response) {
            const user = response.data.results[0]
            axios
                .post("http://localhost:3000/register", {
                    firstname: user.name.first,
                    lastname: user.name.last,
                    email: user.email,
                    phone: user.phone,
                    street: `${user.location.street.number} ${user.location.street.name}`,
                    city: user.location.city,
                    state: user.location.state,
                    zipcode: user.location.postcode,
                    activity: "No activity"
                })
                .then(function (response) {
                    console.log(response.data);
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    });
}
