from multiprocessing import Process, Manager
import os


class TensorProcess(Process):
    def __init__(self, result_dict, us):
        super().__init__()
        self.result_dict = result_dict
        self.us = us

    def run(self):
        os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
        os.environ["CUDA_VISIBLE_DEVICES"] = "6"

        self.result_dict['result'] = self.us.analyze()
