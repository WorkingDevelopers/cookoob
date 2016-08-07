<?php

namespace CoreThemeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('CoreThemeBundle:Default:index.html.twig');
    }
}
