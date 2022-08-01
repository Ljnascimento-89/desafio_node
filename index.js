const { request } = require("express");
const express = require("express")
const nodemon = require("nodemon")
const uuid = require("uuid")

app = express()
app.use(express.json());
const port = 3000

const orders = []

const check_user_id = (request, response, next) => {
    const { id } = request.params

    const index = orders.findIndex(index => index.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found." })
    }

    user_id = id
    user_index = index

    next()
}

const method_url = (request, response, next) => {

    const method = request.method
    const url = request.url

    console.log(`Method: ${method} and URL:${url}`)

    next()
}


app.get("/order", method_url, (request, response) => {
    return response.json(orders)
})

app.post("/order", method_url, (request, response) => {
    const { order, client_name, price } = request.body

    const new_order = { id: uuid.v4(), order, client_name, price, status: "Em preparação" }

    orders.push(new_order)

    return response.status(201).json({ orders })
})


app.put("/order/:id", method_url, check_user_id, (request, response) => {

    const { order, client_name, price } = request.body

    const id = user_id

    const index = user_index

    const updated_user = { id, order, client_name, price, status: "Em preparação" }

    orders[index] = updated_user

    return response.json(updated_user)
})

app.delete("/order/:id", check_user_id, method_url, (request, response) => {

    index = user_index

    orders.splice(index, 1)

    return response.status(204).json()
})

app.get("/order/:id", method_url, check_user_id, (request, response) => {

    index = user_index

    return response.json(orders[index])
})

app.patch("/order/:id", method_url, check_user_id, (request, response) => {

    const index = user_index

    if (index => 0) {
        orders[index].status = "Pronto"
    }

    return response.json(orders[index])

})

app.listen(port, () => {
    console.log(`🐱‍🏍Port utilized ${port}`)
})


