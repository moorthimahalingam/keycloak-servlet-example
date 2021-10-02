package servlet;

import javax.servlet.*;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("Authorization")
public class AuthorizationServlet extends HttpServlet  {
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) thorws IOException {
		response.setContentType("text/html");
		PrintWriter pw = response.getWriter();
		pw.println("Welcome Servlet " + response.getStatus());
		pw.close();
	}
	
	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		doGet(request, response);
	}
}