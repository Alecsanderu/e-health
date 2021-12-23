import { HttpParams } from '@angular/common/http';

export class CustomHttpParams extends HttpParams {
  readonly requiresAuthentication: boolean;
  readonly captchaToken?: string;
  readonly omitCorrelationId?: boolean;
  private httpParams: HttpParams;

  constructor(requiresAuthentication: boolean, captchaToken?: string, omitCorrelationId?: boolean) {
    super();
    this.requiresAuthentication = requiresAuthentication;
    this.captchaToken = captchaToken;
    this.omitCorrelationId = omitCorrelationId;
    this.httpParams = new HttpParams();
  }
    
    
    override append(param: string, value: string): HttpParams {
    this.httpParams = this.httpParams.append( param, value );
    return this;
  }
    
    
    override get(param: string): string | null {
    return this.httpParams.get( param );
  }
    
    
    override getAll(param: string): string[] | null {
    return this.httpParams.getAll( param );
  }
    
    
    override has(param: string): boolean {
    return this.httpParams.has( param );
  }
    
    
    override set(param: string, value: string): HttpParams {
    this.httpParams = this.httpParams.set( param, value );
    return this;
  }
    
    
    override delete(param: string, value?: string): HttpParams {
    this.httpParams = this.httpParams.delete( param, value );
    return this;
  }
    
    
    override toString(): string {
    return this.httpParams.toString();
  }
    
    
    override keys(): string[] {
    return this.httpParams.keys();
  }
}
