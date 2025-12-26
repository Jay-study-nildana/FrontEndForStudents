import { Controller, Post, UseGuards, Request, Body, Get, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { LoginDto } from './dto/LoginDto';
import { RefreshTokenDto } from './dto/RefreshTokenDto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUser } from './get-user.decorator';
import { ApiBody } from '@nestjs/swagger';
import { ApiBearerAuth, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    return this.authService.register(body);
  }

    @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  async login(@Request() req, @Body() body: LoginDto) {
    // req.user comes from LocalStrategy.validate
    return this.authService.login(req.user);
  }

  @Post('refresh')
  async refresh(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

//   @UseGuards(JwtAuthGuard)
//   @Post('logout')
//   async logout(@Body() body: RefreshTokenDto, @GetUser('id') userId: string) {
//     // Accept refresh token or revoke all for the authenticated user
//     if (body?.refreshToken) {
//       await this.authService.logout(body.refreshToken);
//     } else {
//       await this.authService.logout(undefined, userId);
//     }
//     return { success: true };
//   }

  @ApiBearerAuth('access-token')                 // <-- allow Swagger to send the bearer token for this operation
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBody({ type: RefreshTokenDto, required: false }) // body optional when revoking all tokens
  async logout(@Body() body: RefreshTokenDto, @GetUser('id') userId: string) {
    // Accept refresh token or revoke all for the authenticated user
    if (body?.refreshToken) {
      await this.authService.logout(body.refreshToken);
    } else {
      await this.authService.logout(undefined, userId);
    }
    return { success: true };
  }

//   @UseGuards(JwtAuthGuard)
//   @Get('me')
//   getProfile(@GetUser() user: any) {
//     // user is from JwtStrategy.validate (id, email, roles)
//     return user;
//   }

    // Protect and mark this specific endpoint for Swagger
  @ApiBearerAuth('access-token')          // <-- Swagger: indicate this operation uses the "access-token" scheme
  @UseGuards(JwtAuthGuard)               // <-- runtime guard
  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiOkResponse({ description: 'Current user (from JWT)', schema: { example: { id: '<uuid>', email: 'alice@example.com', roles: ['user'] } } })
  getProfile(@GetUser() user: any) {
    // user is from JwtStrategy.validate (id, email, roles)
    return user;
  }

  //check auth system
    // Public endpoint — available with or without a token (Swagger will show the bearer input)
  @ApiBearerAuth('access-token')
  @Get('public-info')
  @ApiOperation({ summary: 'Public endpoint (token optional)' })
  @ApiOkResponse({ description: 'Public info', schema: { example: { message: 'This endpoint works with or without a token', authenticated: false } } })
  publicInfo(@Request() req: any) {
    return {
      message: 'This endpoint works with or without a token',
      // indicate whether a bearer header was provided (no validation performed)
      authenticated: !!req.headers?.authorization,
    };
  }

  // Protected endpoint — requires a valid token (any role)
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  @ApiOperation({ summary: 'Protected endpoint (requires valid token)' })
  @ApiOkResponse({ description: 'Protected data', schema: { example: { message: 'You are authenticated', user: { id: '<uuid>', email: 'alice@example.com' } } } })
  protectedEndpoint(@GetUser() user: any) {
    return { message: 'You are authenticated', user };
  }

  // Admin-only endpoint — requires token with role 'admin'
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin-only')
  @ApiOperation({ summary: "Admin-only endpoint (requires 'admin' role)" })
  @ApiOkResponse({ description: 'Admin response', schema: { example: { message: 'admin access granted' } } })
  adminOnly(@GetUser() user: any) {
    return { message: 'admin access granted', userId: user?.id ?? null };
  }

    @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Get('user-only')
  @ApiOperation({ summary: "User-only endpoint (requires 'user' role)" })
  @ApiOkResponse({ description: 'User response', schema: { example: { message: 'user access granted' } } })
  userOnly(@GetUser() user: any) {
    return { message: 'user access granted', userId: user?.id ?? null };
  }
}