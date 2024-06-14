import { Args, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { AuthService } from "@/auth/auth.service";
import { RefreshTokenInput } from "@/auth/dtos/refresh-token.input";
import { SignInInput } from "@/auth/dtos/sign-in.input";
import { SignUpInput } from "@/auth/dtos/sign-up.input";
import { Auth } from "@/auth/models/auth.model";
import { Token } from "@/auth/models/token.model";
import { User } from "@/users/models/user.model";

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async signIn(@Args("data") data: SignInInput) {
    return this.authService.signIn(data);
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
