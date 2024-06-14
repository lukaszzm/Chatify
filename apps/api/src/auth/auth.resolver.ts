import { Args, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { AuthService } from "@/auth/auth.service";
import { LoginInput } from "@/auth/dtos/login.input";
import { RefreshTokenInput } from "@/auth/dtos/refresh-token.input";
import { SignUpInput } from "@/auth/dtos/sign-up.input";
import { Auth } from "@/auth/models/auth.model";
import { Token } from "@/auth/models/token.model";
import { User } from "@/users/models/user.model";

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async login(@Args("data") { email, password }: LoginInput) {
    const fixedEmail = email.toLowerCase();
    return this.authService.login(fixedEmail, password);
  }

  @Mutation(() => Auth)
  async signUp(@Args("data") data: SignUpInput) {
    return this.authService.signUp(data);
  }

  @Mutation(() => Token)
  refresh(@Args() { refreshToken }: RefreshTokenInput) {
    return this.authService.refreshToken(refreshToken);
  }

  @ResolveField("user", () => User)
  async user(@Parent() auth: Auth) {
    return this.authService.getUserFromToken(auth.accessToken);
  }
}
