const Data_Validation_Obj = {
    username: {
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        isString: {
            errorMessage: "Username must be a string"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password cannot be empty",
        },
        isLength: {
            options : {min: 6, max: 12},
            errorMessage: "Password must be between 6 and 12 characters"
        }
    },
    role: {
        notEmpty: {
            errorMessage: "Role cannot be empty"
        },
        isIn: {
            options: [["superadmin", "admin"]],
            errorMessage: "Sorry, you cannot have access to this section."
        }
    }
}

module.exports = Data_Validation_Obj;