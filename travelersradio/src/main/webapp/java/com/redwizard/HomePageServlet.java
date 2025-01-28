package com.redwizard;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class HomePageServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        RequestDispatcher dispatcher = request.getRequestDispatcher("../../../../../../../HTML/pages/index.html");
        dispatcher.forward(request, response);
    }
}

