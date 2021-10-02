package filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import javax.servlet.*;
import java.io.IOException;
import java.util.Date;

@WebFilter("AuthFilter")
public class AuthFilter implements Filter {
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, 
			FilterChain filterChain) throws IOException, ServletException {
				
		HttpServletRequest servletRequest = (HttpServletRequest) request;
		HttpServletResponse servletResponse = (HttpServletResponse) response;
		
		String token = request.getHeader("Authorization");
		
		if (token == null) {
			try {
				DecodedJWT jwt = JWT.decode(token);
				Date expiryDate = jwt.getExpiresAt();
				if (expiryDate.before(new Date())) {
					response.reset();
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					servletResponse = response;
				}
				
			} catch (Exception e) {
				response.reset();
				response.setStatus(HttpServletResponse.SC_FORBIDDEN);
				servletResponse = response;
			}
		}
		filterChain.doFilter(servletRequest, servletResponse);
	}
}