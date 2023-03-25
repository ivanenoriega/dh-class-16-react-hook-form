import TextField from "@mui/material/TextField"
import { Controller } from "react-hook-form"

const Input = ({ control, name, type, rules }) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({
                field: {
                    value, onChange
                },
            }) => {
                return (
                    <TextField
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                    />
                )
            }} />
    )
}

export default Input