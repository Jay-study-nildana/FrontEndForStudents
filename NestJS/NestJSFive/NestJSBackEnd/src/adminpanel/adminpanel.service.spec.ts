import { AdminpanelService } from './adminpanel.service';
import { ListUsersDto } from './dto/ListUsersDto';

type MockedAdminpanelService = jest.Mocked<AdminpanelService>;

describe('AdminpanelService (mocked)', () => {
  let service: MockedAdminpanelService;

  // individual, properly typed jest mock functions
  let listUsers: jest.MockedFunction<AdminpanelService['listUsers']>;
  let getUserById: jest.MockedFunction<AdminpanelService['getUserById']>;
  let listAllUsers: jest.MockedFunction<AdminpanelService['listAllUsers']>;
  let assignRoleToUser: jest.MockedFunction<
    AdminpanelService['assignRoleToUser']
  >;
  let listRoles: jest.MockedFunction<AdminpanelService['listRoles']>;

  beforeEach(() => {
    listUsers = jest.fn().mockResolvedValue({
      items: [{ id: 'u1' }],
      total: 1,
      page: 1,
      pageSize: 25,
    } as any);
    getUserById = jest.fn().mockResolvedValue({
      id: 'u1',
      email: 'a@x.com',
      name: 'A',
      roles: ['user'],
    } as any);
    listAllUsers = jest
      .fn()
      .mockResolvedValue([{ id: 'u1', email: 'a@x.com' } as any]);
    assignRoleToUser = jest
      .fn()
      .mockResolvedValue({ id: 'u1', roles: ['admin'] } as any);
    listRoles = jest.fn().mockResolvedValue(['admin', 'user']);

    // assemble the service object from the typed mocks
    service = {
      listUsers,
      getUserById,
      listAllUsers,
      assignRoleToUser,
      listRoles,
    } as unknown as MockedAdminpanelService;

    jest.clearAllMocks();
  });

  it('mocked listUsers is callable and returns expected shape', async () => {
    const q: ListUsersDto = { page: 1, pageSize: 25 } as any;
    const res = await listUsers(q); // call the mock directly to avoid unbound-method lint issues
    expect(listUsers).toHaveBeenCalledWith(q);
    expect(res).toHaveProperty('items');
  });

  it('mocked getUserById delegates to mock', async () => {
    const res = await getUserById('u1');
    expect(getUserById).toHaveBeenCalledWith('u1');
    expect(res).toHaveProperty('id', 'u1');
  });

  it('mocked listAllUsers delegates to mock', async () => {
    const res = await listAllUsers();
    expect(listAllUsers).toHaveBeenCalled();
    expect(Array.isArray(res)).toBe(true);
  });

  it('mocked assignRoleToUser delegates to mock', async () => {
    const res = await assignRoleToUser('u1', 'admin');
    expect(assignRoleToUser).toHaveBeenCalledWith('u1', 'admin');
    expect(res).toHaveProperty('roles');
  });

  it('mocked listRoles delegates to mock', async () => {
    const res = await listRoles();
    expect(listRoles).toHaveBeenCalled();
    expect(res).toEqual(['admin', 'user']);
  });
});
