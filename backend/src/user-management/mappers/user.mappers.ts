import { User } from '~user-management/models/user';
import { UserDto } from '~user-management/public-contracts/dtos/user/user.dto';

export const modelToUserDto = (data: User): UserDto => (
    {
        id       : data.id,
        email    : data.email,
        phone    : data.phone,
        name     : data.name,
        address  : data.address,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    }
);
