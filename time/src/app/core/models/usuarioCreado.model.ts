export interface CreateUserResponse {
    data: {
        createUser: {
            user: {
                id: string;
                firstName: string;
                lastName: string;
                username: string;
                email: string;
            };
        };
    };
}